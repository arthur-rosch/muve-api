import nodemailer from 'nodemailer'

interface EmailOptions {
  from: string
  to: string
  subject: string
  text?: string
  html?: string
}

export async function sendEmail({
  from,
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<void> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.your-email-provider.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    })

    // Opções do email
    const mailOptions = {
      to,
      from,
      text,
      html,
      subject,
    }

    // Enviar o email
    const info = await transporter.sendMail(mailOptions)
    console.log('Email enviado: %s', info.messageId)
  } catch (error) {
    console.error('Erro ao enviar o email:', error)
    throw error
  }
}
