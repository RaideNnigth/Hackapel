// /backend/src/services/appointmentConfirmationService.js
import { Appointment } from "../models/index.js";
import {
  APPOINTMENT_HOOKS,
  DEFAULT_APPOINTMENT_HOOKS,
} from "../config/appointmentHooks.js";

function normalizeText(text = "") {
  return text.trim().toLowerCase();
}

function getHooksForType(type) {
  if (!type) return DEFAULT_APPOINTMENT_HOOKS;

  const key = String(type).toUpperCase();
  return APPOINTMENT_HOOKS[key] || DEFAULT_APPOINTMENT_HOOKS;
}

/**
 * Processa a confirmação vinda do WhatsApp.
 * Retorna um objeto com:
 * - replyText: texto que o chatbot deve enviar de volta ao paciente
 */
export async function processWhatsappConfirmation({ phone, messageText }) {
  const text = normalizeText(messageText);

  // 1) Localiza agendamento PENDENTE por telefone
  const appointment = await Appointment.findOne({
    where: { phone, status: "PENDING" },
    order: [["createdAt", "DESC"]],
  });

  if (!appointment) {
    console.log(
      `[CONFIRMATION] Nenhum agendamento pendente para o telefone ${phone}`
    );
    return {
      replyText:
        "Não encontrei nenhum agendamento pendente vinculado a este número. Em caso de dúvidas, entre em contato com a clínica.",
    };
  }

  const hooks = getHooksForType(appointment.type);

  // 2) Interpreta resposta

  if (text === "sim") {
    appointment.status = "CONFIRMED";
    appointment.confirmationChannel = "WHATSAPP";
    appointment.confirmedAt = new Date();
    await appointment.save();

    // dispara hook específico
    await hooks.onConfirm(appointment);

    return {
      replyText: "Perfeito! Sua consulta/exame foi confirmada com sucesso ✅",
    };
  }

  if (text === "não" || text === "nao") {
    appointment.status = "CANCELLED";
    appointment.confirmationChannel = "WHATSAPP";
    appointment.confirmedAt = new Date();
    await appointment.save();

    // dispara hook específico
    await hooks.onCancel(appointment);

    return {
      replyText:
        "Entendido! Seu agendamento foi marcado como não confirmado. Em caso de dúvidas, entre em contato com a clínica. ❌",
    };
  }

  // 3) Texto fora do padrão
  return {
    replyText: 'Para confirmar sua consulta, responda "sim" ou "não".',
  };
}
