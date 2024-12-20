import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '@/use-cases/erros'
import { makeGetManyVideoByUserIdUseCase } from '@/use-cases/factories/video/make-get-many-videos-by-user-id'

export async function getManyVideoByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  try {
    const getManyVideoByUserIdUseCase = makeGetManyVideoByUserIdUseCase()

    const videos = await getManyVideoByUserIdUseCase.execute({
      userId,
    })

    return reply.status(200).send(videos)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
