import { Op } from "sequelize";
import Notification from "../models/Notification.js";
import PostToSend from "../models/PostToSend.js";
import { EmailService } from "../services/emailService.js";
import { sendWebPushToUser } from "../services/webPushService.js";
import User from "../models/User.js";
import axios from "axios";

let maxEmails = 3;
async function sendEmail({ to, subject, text, html }) {
  if (maxEmails <= 0) {
    console.log("Email sending limit reached, skipping email");
    return false;
  }
  maxEmails -= 1;
  
  if (!to) throw new Error("Missing recipient email");

  try {
    await EmailService({ to, subject, text, html });
    console.log(`[EMAIL] Sending email to ${to} | subject="${subject}"`);
    return true;
  } catch (e) {
    console.log("If you dont want this mail to be sent, I had great news!");
    console.log("Error while sending mail:", e);
    return false;
  }
}

/**
 * Placeholder for WhatsApp sending (without paid official API).
 * In practice you might use:
 *  - an on-premise gateway,
 *  - integration with an open-source tool,
 *  - or simply not implement until you define a legal integration.
 */
async function sendWhatsApp({ phone, message }) {
  if (!phone) throw new Error("Missing phone number");

  const BOT_URL = process.env.WHATSAPP_BOT_URL || "http://localhost:2000";

  try {
    const payload = {
      number: phone,
      message: message,
    };

    const response = await axios.post(`${BOT_URL}/send-message`, payload);

    console.log(
      `[WHATSAPP] Mensagem enviada pelo bot | phone=${phone} | message="${message}" | resposta=`,
      response.data
    );

    return true;
  } catch (err) {
    console.error(
      `[WHATSAPP] Erro ao enviar mensagem para ${phone}:`,
      err?.response?.data || err.message
    );
    return false;
  }
}

async function sendWebPush({ userId, title, body }) {
  const ok = await sendWebPushToUser({
    userId,
    title,
    body,
    data: {
      timestamp: new Date().toISOString(),
    },
  });

  return ok;
}

/**
 * Helper: try all channels and return whether at least one succeeded.
 */
async function dispatchToAllChannels({ user, subject, text }) {
  const results = {
    email: false,
    whatsapp: false,
    webpush: false,
  };

  // EMAIL
  try {
    if (user.email) {
      await sendEmail({
        to: user.email,
        subject,
        text,
      });
      results.email = true;
    }
  } catch (err) {
    console.error(
      `[DISPATCH] Error sending email to ${user.email}:`,
      err.message
    );
  }

  // WHATSAPP
  try {
    if (user.phone_number) {
      await sendWhatsApp({
        phone: user.phone_number,
        message: text,
      });
      results.whatsapp = true;
    }
  } catch (err) {
    console.error(
      `[DISPATCH] Error sending WhatsApp to ${user.phone_number}:`,
      err.message
    );
  }

  // WEBPUSH
  try {
    // Only if you decide to implement subscriptions per user
    await sendWebPush({
      userId: user.id,
      title: subject,
      body: text,
    });
    results.webpush = true;
  } catch (err) {
    console.error(
      `[DISPATCH] Error sending WebPush to user ${user.id}:`,
      err.message
    );
  }

  // At least one channel worked?
  return results.email || results.whatsapp || results.webpush;
}

/**
 * Process notifications from the Notification table.
 * Rules:
 *  - scheduleStatus === "AGENDADA"
 *  - notificationStatus IN ("PENDING", "ERROR")
 * Sends to the user with matching CPF (and is_active = true).
 */
async function processNotifications() {
  const pendingNotifications = await Notification.findAll({
    where: {
      scheduleStatus: "AGENDADA",
      notificationStatus: {
        [Op.in]: ["PENDING", "ERROR"],
      },
    },
  });

  if (!pendingNotifications.length) {
    console.log("[JOB] No pending Notification records to process.");
    return;
  }

  console.log(
    `[JOB] Found ${pendingNotifications.length} Notification records to process.`
  );

  for (const notification of pendingNotifications) {
    try {
      const user = await User.findOne({
        where: {
          cpf: notification.cpf,
          is_active: true,
        },
      });

      if (!user) {
        console.warn(
          `[JOB] No active user found with CPF=${notification.cpf}. Marking notification as ERROR.`
        );
        notification.notificationStatus = "ERROR";
        await notification.save();
        continue;
      }

      const subject = `Appointment status: ${notification.scheduleStatus}`;
      const text = `
        Olá ${user.full_name},

        Esta é uma notificação sobre sua consulta agendada.

        Tipo da consulta: ${notification.consultType ?? "N/A"}
        Médico: ${notification.medicName ?? "N/A"}
        Especialidade: ${notification.especiality ?? "N/A"}
        Inicio: ${notification.startDateTime ?? "N/A"}
        Fim: ${notification.endDateTime ?? "N/A"}
        Estado da consulta: ${notification.scheduleStatus}

        Atenciosamente`.trim();

      const anyChannelSucceeded = await dispatchToAllChannels({
        user,
        subject,
        text,
      });

      notification.notificationStatus = anyChannelSucceeded ? "SENT" : "ERROR";
      await notification.save();

      console.log(
        `[JOB] Notification ${notification.id} processed. Final status: ${notification.notificationStatus}`
      );
    } catch (err) {
      console.error(
        `[JOB] Error processing Notification ${notification.id}:`,
        err
      );
      notification.notificationStatus = "ERROR";
      await notification.save();
    }
  }
}

/**
 * Process posts from PostToSend table.
 * Rules:
 *  - notificationStatus IN ("PENDING", "ERROR")
 * Sends to all active users in User table.
 */
async function processPostsToSend() {
  const pendingPosts = await PostToSend.findAll({
    where: {
      notificationStatus: {
        [Op.in]: ["PENDING", "ERROR"],
      },
    },
  });

  if (!pendingPosts.length) {
    console.log("[JOB] No pending PostToSend records to process.");
    return;
  }

  console.log(
    `[JOB] Found ${pendingPosts.length} PostToSend records to process.`
  );

  const targetUsers = await User.findAll({
    where: {
      is_active: true,
      // Only users with at least one contact method
      [Op.or]: [
        { email: { [Op.ne]: null } },
        { phone_number: { [Op.ne]: null } },
      ],
    },
  });

  if (!targetUsers.length) {
    console.warn(
      "[JOB] There are no active users with email/phone to receive posts."
    );
    return;
  }

  for (const post of pendingPosts) {
    try {
      let anySucceeded = false;

      for (const user of targetUsers) {
        const subject = post.postTitle;
        const text = post.postBody;

        const ok = await dispatchToAllChannels({
          user,
          subject,
          text,
        });

        if (ok) {
          anySucceeded = true;
        }
      }

      post.notificationStatus = anySucceeded ? "SENT" : "ERROR";
      await post.save();

      console.log(
        `[JOB] PostToSend ${post.id} processed. Final status: ${post.notificationStatus}`
      );
    } catch (err) {
      console.error(`[JOB] Error processing PostToSend ${post.id}:`, err);
      post.notificationStatus = "ERROR";
      await post.save();
    }
  }
}

/**
 * Main job entrypoint: process both Notification and PostToSend tables.
 */
export async function runNotificationDispatchJob() {
  console.log("[JOB] NotificationDispatchJob started.");

  try {
    await processNotifications();
    await processPostsToSend();
  } catch (err) {
    console.error("[JOB] Error in NotificationDispatchJob:", err);
  }

  console.log("[JOB] NotificationDispatchJob finished.");
}
