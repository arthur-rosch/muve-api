import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { sendEmail } from '@/services/send-email'
import { ResetPasswordEmail } from '@/templates'
import { makeFindByEmailUseCase } from '@/use-cases/factories/user/make-find-ny-email-use-case'
import { NotFoundErros } from '@/use-cases/erros'

export async function generatePasswordResetToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const resetTokenSchema = z.object({
    email: z.string().email(),
  })

  const { email } = resetTokenSchema.parse(request.body)

  try {
    const findByEmailUseCase = makeFindByEmailUseCase()

    const { user } = await findByEmailUseCase.execute({
      email,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '1d',
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
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
