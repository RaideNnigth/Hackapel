// backend/src/controllers/telegramController.js
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { sendMessage } from '../services/telegramService.js';

/**
 * Manipula atualizações enviadas pelo Telegram para o webhook.
 */
export const handleTelegramUpdate = async (req, res) => {
  try {
    const update = req.body;

    // Caso o usuário clique em um botão inline
    if (update.callback_query) {
      const { id: callbackId, data, message, from } = update.callback_query;
      // 'data' deve vir no formato "acao:notificationId" (ex.: "confirmar:5")
      const [acao, notificationId] = data.split(':');
      const notification = await Notification.findByPk(notificationId);

      if (notification) {
        if (acao === 'confirmar') {
          notification.scheduleStatus = 'AGENDA_CONFIRMADA';
        } else if (acao === 'cancelar') {
          notification.scheduleStatus = 'CANCELADA';
        }
        await notification.save();

        // Responde ao callback para remover o "loading" no Telegram
        await sendMessage(
          from.id,
          `Sua consulta foi ${acao === 'confirmar' ? 'confirmada' : 'cancelada'} com sucesso!`
        );
      }
      return res.sendStatus(200);
    }

    // Mensagens de texto comuns
    if (update.message) {
      const { text, chat } = update.message;
      // Aqui você pode tratar comandos como /start ou mensagens livres.
      // Exemplo: se o texto for '/start <cpf>' associe chatId ao CPF, etc.
      // Por simplicidade, apenas enviaremos um texto de boas-vindas.
      if (text.startsWith('/start')) {
        await sendMessage(
          chat.id,
          'Olá! Quando houver um agendamento pendente, você receberá aqui opções para confirmar ou cancelar.'
        );
      }
      return res.sendStatus(200);
    }

    // Outros tipos de update
    return res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook do Telegram:', error);
    return res.sendStatus(500);
  }
};
