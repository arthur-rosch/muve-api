import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '../../../use-cases/erros'
import { makeGetManyVideoContainFormByUserIdUseCase } from '../../../use-cases/factories/video/make-get-many-video-contain-form-by-user-id-use-case'

export async function getManyVideoContainFormByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  try {
    const getManyVideoContainFormByUserIdUseCase = makeGetManyVideoContainFormByUserIdUseCase()

    const videos = await getManyVideoContainFormByUserIdUseCase.execute({
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
