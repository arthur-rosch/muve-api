import { z } from 'zod'
import { NotBeforeError } from 'jsonwebtoken'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAddInfoFirstAccessUseCase } from '@/use-cases/factories/user/make-add-info-first-access-use-case'

export async function AddInfoFirstAccess(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addInfoFirstAccessBodySchema = z.object({
    accountType: z.string(),
    memberArea: z.string(),
    videoHosting: z.string(),
  })

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  const { accountType, memberArea, videoHosting } =
    addInfoFirstAccessBodySchema.parse(request.body)

  try {
    const addInfoFirstAccessUseCase = makeAddInfoFirstAccessUseCase()

    await addInfoFirstAccessUseCase.execute({
      accountType,
      memberArea,
      videoHosting,
      userId,
    })

    return reply.status(200).send(true)
  } catch (err) {
    if (err instanceof NotBeforeError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
