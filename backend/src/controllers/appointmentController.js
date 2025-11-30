// /backend/src/controllers/AppointmentController.js
import { Appointment } from "../models/index.js";
import { sendWhatsappMessage } from "../services/whatsappService.js";

export async function createAppointment(req, res) {
  try {
    const { phone, patientName, date, time, type } = req.body;

    const appointment = await Appointment.create({
      phone,
      patientName,
      date,
      time,
      type,           // "CONSULTATION", "EXAM", "TELECONSULT", etc
      status: "PENDING",
    });

    const message = [
      `Olá, ${patientName}!`,
      `Você tem um ${type?.toLowerCase() || "atendimento"} agendado em ${date} às ${time}.`,
      "",
      `Para confirmar sua presença, responda *sim* neste WhatsApp.`,
      `Para recusar/cancelar, responda *não*.`,
    ].join("\n");

    await sendWhatsappMessage({ number: phone, message });

    return res.status(201).json(appointment);
  } catch (err) {
    console.error("Erro ao criar agendamento:", err);
    return res.status(500).json({ error: "Erro ao criar agendamento" });
  }
}
