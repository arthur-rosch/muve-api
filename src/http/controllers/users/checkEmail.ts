import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '../../../use-cases/erros/'
import { makeCheckEmailUseCase } from '../../../use-cases/factories/user/make-check-email-use-case'

export async function checkEmail(request: FastifyRequest, reply: FastifyReply) {
  const checkEmailBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = checkEmailBodySchema.parse(request.body)

  try {
    const checkEmailUseCase = makeCheckEmailUseCase()

    await checkEmailUseCase.execute({
      email,
    })

    return reply.status(200).send(true)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
