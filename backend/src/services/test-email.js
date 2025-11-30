import dotenv from "dotenv";
import transporter from "./mailer.js";  // já configurado
dotenv.config();

async function sendRealEmail() {
  try {
    const result = await transporter.sendMail({
      from: `"Meu Sistema" <${process.env.SMTP_USER}>`,
      to: "ravilonaguiardossantos@gmail.com", // coloque qualquer email real aqui
      subject: "🚀 Teste REAL de envio via Nodemailer + Gmail",
      text: "Seu e-mail REAL foi enviado com sucesso!",
      html: `
        <h1>🚀 Teste REAL de Envio</h1>
        <p>Este e-mail foi enviado diretamente do seu backend Node.js.</p>
        <p><b>Horário:</b> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("📧 E-MAIL ENVIADO COM SUCESSO!");
    console.log(result);

  } catch (error) {
    console.error("❌ ERRO AO ENVIAR E-MAIL:");
    console.error(error);
  }
}

sendRealEmail();
