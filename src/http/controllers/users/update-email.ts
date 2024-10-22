import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/erros/'
import { makeUpdateEmailUseCase } from '@/use-cases/factories/user/make-update-email-use-case'

export async function updateEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEmailBodySchema = z.object({
    email: z.string().email(),
    newEmail: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password, newEmail } = updateEmailBodySchema.parse(
    request.body,
  )

  try {
    const updateEmailUseCase = makeUpdateEmailUseCase()

    const { user } = await updateEmailUseCase.execute({
      email,
      newEmail,
      password,
    })

    user.password_hash = ''

    return reply.status(200).send({
      user,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
