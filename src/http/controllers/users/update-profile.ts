import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '../../../use-cases/erros/'
import { makeUpdateProfileUseCase } from '../../../use-cases/factories/user/make-update-profile-use-case'

export async function updateProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProfileBodySchema = z.object({
    document: z.string(),
    phone: z.string(),
    name: z.string(),
  })

  const userId = request.user?.sub

  const { document, name, phone } = updateProfileBodySchema.parse(request.body)

  try {
    const updateProfileUseCase = makeUpdateProfileUseCase()

    const { user } = await updateProfileUseCase.execute({
      document,
      name,
      phone,
      userId,
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
