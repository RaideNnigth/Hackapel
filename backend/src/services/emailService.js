const transporter = require("./mailer");

async function sendEmail({ to, subject, text, html }) {
  return transporter.sendMail({
    from: `"Meu Sistema" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendEmail };
