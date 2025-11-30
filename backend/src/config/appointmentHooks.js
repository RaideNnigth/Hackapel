// /backend/src/config/appointmentHooks.js

/**
 * Cada tipo de agendamento pode ter:
 * - onConfirm(appointment)
 * - onCancel(appointment)
 *
 * Ambos podem ser async e chamar outros serviços, enviar e-mail, etc.
 */

export const APPOINTMENT_HOOKS = {
  // Exemplo: consulta presencial
  CONSULTATION: {
    onConfirm: async (appointment) => {
      console.log(
        `[HOOK] Consulta confirmada (CONSULTATION) para ID=${appointment.id}`
      );
      // Exemplo: notificar fila, enviar e-mail, etc
      // await filaService.registrarPresenca(appointment);
    },
    onCancel: async (appointment) => {
      console.log(
        `[HOOK] Consulta cancelada (CONSULTATION) para ID=${appointment.id}`
      );
      // Exemplo: liberar vaga, registrar motivo, etc
      // await filaService.liberarVaga(appointment);
    },
  },

  // Exame (laboratório, imagem, etc)
  EXAM: {
    onConfirm: async (appointment) => {
      console.log(
        `[HOOK] Exame confirmado (EXAM) para ID=${appointment.id}`
      );
      // Exemplo: disparar ordem de preparo, checklist de jejum, etc
    },
    onCancel: async (appointment) => {
      console.log(
        `[HOOK] Exame cancelado (EXAM) para ID=${appointment.id}`
      );
      // Exemplo: avisar setor de exames, liberar horário, etc
    },
  },

  // Teleconsulta / remoto
  TELECONSULT: {
    onConfirm: async (appointment) => {
      console.log(
        `[HOOK] Teleconsulta confirmada (TELECONSULT) ID=${appointment.id}`
      );
      // Exemplo: gerar link de sala, enviar SMS/WhatsApp com o link, etc
    },
    onCancel: async (appointment) => {
      console.log(
        `[HOOK] Teleconsulta cancelada (TELECONSULT) ID=${appointment.id}`
      );
      // Exemplo: registrar abandono, reagendar automático, etc
    },
  },
};

/**
 * Hook default caso o tipo não esteja mapeado
 */
export const DEFAULT_APPOINTMENT_HOOKS = {
  onConfirm: async (appointment) => {
    console.log(
      `[HOOK] Confirmação padrão para agendamento ID=${appointment.id}, tipo=${appointment.type}`
    );
  },
  onCancel: async (appointment) => {
    console.log(
      `[HOOK] Cancelamento padrão para agendamento ID=${appointment.id}, tipo=${appointment.type}`
    );
  },
};
