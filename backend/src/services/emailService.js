import transporter from "./mailer.js";

export async function EmailService({ to, subject, text, html }) {
  
  if (true) {
    return;
  }

  return transporter.sendMail({
    from: `"Meu Sistema" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
