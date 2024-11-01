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
}: EmailOptions): Promise<void | string> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'mail.muveplayer.com',
      port: 465,
      secure: true,
      auth: {
        user: 'suporte@muveplayer.com',
        pass: 'Muve240297*',
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
    return info
  } catch (error) {
    console.error('Erro ao enviar o email:', error)
    throw error
  }
}
