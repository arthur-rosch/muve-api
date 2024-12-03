import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  InvalidCredentialsError,
  NotFoundErros,
} from '../../../use-cases/erros/'
import { makeForgotPasswordUseCase } from '../../../use-cases/factories/user/make-forgot-password-use-case'

export async function forgotPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePasswordBodySchema = z.object({
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
  })

  const userId = request.user?.sub

  const { confirmNewPassword, newPassword } = updatePasswordBodySchema.parse(
    request.body,
  )

  try {
    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    const { user } = await forgotPasswordUseCase.execute({
      userId,
      newPassword,
      confirmNewPassword,
    })

    user.password_hash = ''

    return reply.status(200).send({
      user,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof NotFoundErros) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
