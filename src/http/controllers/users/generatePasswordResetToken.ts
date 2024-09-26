import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { sendEmail } from '@/services/send-email'
import { ResetPasswordEmail } from '@/templates'
import { prisma } from '@/lib/prisma'

export async function generatePasswordResetToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const resetTokenSchema = z.object({
    email: z.string().email(),
  })

  const { email } = resetTokenSchema.parse(request.body)

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  const token = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sign: {
        sub: user.id,
        expiresIn: '7d',
      },
    },
  )

  const resetLink = `https://web.muveplayer.com/reset/password/${token}`

  const emailContent = ResetPasswordEmail({
    link: resetLink,
    name: user.name,
  })

  await sendEmail({
    from: 'contato@muveplayer.com',
    to: email,
    subject: 'Redefinição de Senha Muve Player',
    html: emailContent,
  })

  return reply.status(200).send({
    message: 'Token de redefinição de senha enviado para o email.',
  })
}
