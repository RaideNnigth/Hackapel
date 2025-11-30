// src/services/webPushService.js
import webpush from "web-push";
import WebPushSubscription from "../models/WebPushSubscription.js";

// Configurar VAPID com variáveis de ambiente
// Gere as chaves com: npx web-push generate-vapid-keys
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_SUBJECT = process.env.VAPID_SUBJECT || "mailto:admin@hackapel.local";

if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
  console.warn(
    "[WEBPUSH] VAPID keys not set. WebPush will not work until VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY are configured."
  );
} else {
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
}

/**
 * Envia uma notificação WebPush para UMA subscription específica.
 * @param {Object} params
 * @param {Object} params.subscription - objeto com endpoint, keys, expirationTime
 * @param {string} params.title
 * @param {string} params.body
 * @param {Object} [params.data] - payload extra (links, ids etc)
 */
export async function sendWebPushToSubscription({
  subscription,
  title,
  body,
  data = {},
}) {
  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.warn("[WEBPUSH] Skipping send. VAPID keys are not configured.");
    return false;
  }

  const pushSubscription = {
    endpoint: subscription.endpoint,
    expirationTime: subscription.expirationTime || null,
    keys: {
      p256dh: subscription.p256dh,
      auth: subscription.auth,
    },
  };

  const payload = JSON.stringify({
    title,
    body,
    data,
  });

  try {
    await webpush.sendNotification(pushSubscription, payload);
    console.log(
      `[WEBPUSH] Notification sent to endpoint=${subscription.endpoint.slice(
        0,
        40
      )}...`
    );
    return true;
  } catch (err) {
    // Se a subscription ficou inválida (ex: usuário desinscreveu), removemos
    if (err.statusCode === 410 || err.statusCode === 404) {
      console.warn(
        "[WEBPUSH] Subscription is no longer valid. Deleting from DB."
      );
      await WebPushSubscription.destroy({
        where: { id: subscription.id },
      });
    } else {
      console.error("[WEBPUSH] Error sending notification:", err);
    }
    return false;
  }
}

/**
 * Envia notificação WebPush para TODAS as subscriptions de um usuário.
 * @param {Object} params
 * @param {number} params.userId
 * @param {string} params.title
 * @param {string} params.body
 * @param {Object} [params.data]
 * @returns {boolean} true se pelo menos uma subscription recebeu
 */
export async function sendWebPushToUser({ userId, title, body, data = {} }) {
  const subscriptions = await WebPushSubscription.findAll({
    where: { userId },
  });

  if (!subscriptions.length) {
    console.log(
      `[WEBPUSH] No WebPush subscriptions found for userId=${userId}`
    );
    return false;
  }

  let anySucceeded = false;

  for (const sub of subscriptions) {
    const ok = await sendWebPushToSubscription({
      subscription: sub,
      title,
      body,
      data,
    });

    if (ok) anySucceeded = true;
  }

  return anySucceeded;
}
