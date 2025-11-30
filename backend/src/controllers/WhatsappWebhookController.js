// /backend/src/controllers/WhatsappWebhookController.js
import { processWhatsappConfirmation } from "../services/appointmentConfirmationService.js";

export async function handleWhatsappWebhook(req, res) {
  try {
    const { phone, messageText } = req.body;

    if (!phone || !messageText) {
      return res
        .status(400)
        .json({ error: "phone e messageText são obrigatórios" });
    }

    const result = await processWhatsappConfirmation({ phone, messageText });

    // result.replyText será devolvido pro paciente pelo chatbot
    return res.json({
      ok: true,
      ...result,
    });
  } catch (err) {
    console.error("Erro no webhook do WhatsApp:", err);
    return res.status(500).json({ error: "Erro ao processar mensagem" });
  }
}
