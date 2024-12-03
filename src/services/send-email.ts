import { env } from '../env'
import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  from: string
  text?: string
  html?: string
  subject: string
}

export async function sendEmail({
  to,
  from,
  text,
  html,
  subject,
}: EmailOptions): Promise<void | string> {
  try {
    const transporter = nodemailer.createTransport({
      host: env.HOST_EMAIL,
      port: env.PORT_EMAIL,
      secure: true,
      auth: {
        user: env.USER_EMAIL,
        pass: env.PASS_EMAIL,
      },
    })

    const mailOptions = {
      to,
      from,
      text,
      html,
      subject,
    }

    const info = await transporter.sendMail(mailOptions)

    return info
  } catch (error) {
    console.error('Erro ao enviar o email:', error)
    throw error
  }
}
