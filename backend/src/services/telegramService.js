// backend/src/services/telegramService.js
import dotenv from 'dotenv';
dotenv.config();

const API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

export async function setWebhook() {
  const response = await fetch(`${API_URL}/setWebhook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: process.env.TELEGRAM_WEBHOOK_PUBLIC_URL }),
  });
  return response.json();
}

export async function sendMessage(chatId, text, replyMarkup) {
  const body = {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
  };
  if (replyMarkup) {
    body.reply_markup = replyMarkup;
  }
  const response = await fetch(`${API_URL}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return response.json();
}
