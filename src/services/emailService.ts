
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vanessasamira1996@gmail.com",
    pass: "joli pxnh fjgj tfus",
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: "neulopz98@gmail.com",
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email enviado com sucesso");
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
    throw error;
  }
}
