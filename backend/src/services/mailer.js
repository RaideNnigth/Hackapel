const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

// Diagnóstico opcional:
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP Error:", error);
  } else {
    console.log("✅ SMTP connected successfully");
  }
});

module.exports = transporter;
