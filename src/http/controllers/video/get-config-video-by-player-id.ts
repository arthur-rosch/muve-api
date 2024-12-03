import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '../../../use-cases/erros'
import { makeGetVideoByPlayerIdUseCase } from '../../../use-cases/factories/video/make-get-config-video-by-player-id'

export async function getConfigVideoByPlayerId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getConfigVideoByPlayerIdParamsSchema = z.object({
    videoPlayerId: z.string(),
  })

  const { videoPlayerId } = getConfigVideoByPlayerIdParamsSchema.parse(
    request.params,
  )

  try {
    const getConfigVideoByPlayerIdUseCase = makeGetVideoByPlayerIdUseCase()

    const configs = await getConfigVideoByPlayerIdUseCase.execute({
      videoPlayerId,
    })

    return reply.status(200).send(configs)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
