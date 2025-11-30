// src/bot.js
const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const express = require('express');
const cors = require('cors');

// =======================
// 1) CONFIG WHATSAPP
// =======================

const CHROME_PROFILE_PATH = '/tmp/chromium-profile';

// Limpa o perfil do Chromium a cada start (evita lock de profile)
try {
  fs.rmSync(CHROME_PROFILE_PATH, { recursive: true, force: true });
  console.log('🧹 Limpando perfil do Chromium em', CHROME_PROFILE_PATH);
} catch (err) {
  console.error('Erro ao limpar perfil do Chromium:', err);
}

let clientReady = false;

const client = new Client({
  puppeteer: {
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    userDataDir: CHROME_PROFILE_PATH,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote',
      '--disable-extensions'
    ]
  }
});

client.on('qr', qr => {
  console.log('📲 QR RECEBIDO. ESCANEIE COM O WHATSAPP:');
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('✅ Autenticado com sucesso!');
});

client.on('ready', () => {
  console.log('🤖 Bot pronto e conectado!');
  clientReady = true;
});

client.on('message', async message => {
  const text = (message.body || '').trim().toLowerCase();

  console.log(`📩 Mensagem recebida de ${message.from}: "${message.body}"`);

  if (text === 'sim') {
    await message.reply(
      'Perfeito! Sua resposta *SIM* foi registrada (modo teste, sem banco ainda).'
    );
  } else if (text === 'não' || text === 'nao') {
    await message.reply(
      'Tudo bem! Sua resposta *NÃO* foi registrada (modo teste, sem banco ainda).'
    );
  } else if (text === 'ping') {
    await message.reply('pong 🏓');
  } else {
    await message.reply(
      'Oi! Neste modo eu entendo apenas:\n- "sim"\n- "não" / "nao"\n- "ping"'
    );
  }
});

client.on('disconnected', reason => {
  console.log('❌ Cliente desconectado:', reason);
  clientReady = false;
});

client.initialize();

// =======================
// 2) API HTTP (Express)
// =======================

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 2000;

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    whatsappReady: clientReady
  });
});

// POST /send-message
// body: { "number": "55DDDNUMERO", "message": "texto" }
app.post('/send-message', async (req, res) => {
  if (!clientReady) {
    return res.status(503).json({ error: 'WhatsApp client not ready yet' });
  }

  const { number, message } = req.body;

  if (!number || !message) {
    return res.status(400).json({ error: 'number e message são obrigatórios' });
  }

  try {
    const cleanNumber = String(number).replace(/\D/g, '');
    const chatId = `${cleanNumber}@c.us`;

    await client.sendMessage(chatId, message);

    return res.json({
      success: true,
      to: chatId,
      message
    });
  } catch (err) {
    console.error('Erro ao enviar mensagem via API:', err);
    return res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

// Sobe o servidor HTTP SEM depender de banco
app.listen(PORT, () => {
  console.log(`API HTTP rodando em http://0.0.0.0:${PORT}`);
});
