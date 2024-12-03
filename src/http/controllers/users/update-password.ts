import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import {
  InvalidCredentialsError,
  NotFoundErros,
} from '../../../use-cases/erros/'
import { makeUpdatePasswordUseCase } from '../../../use-cases/factories/user/make-update-password-use-case'

export async function updatePassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updatePasswordBodySchema = z.object({
    newPassword: z.string().min(6),
    password: z.string().min(6),
  })

  const userId = request.user?.sub

  const { password, newPassword } = updatePasswordBodySchema.parse(request.body)

  try {
    const updatePasswordUseCase = makeUpdatePasswordUseCase()

    const { user } = await updatePasswordUseCase.execute({
      userId,
      password,
      newPassword,
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
