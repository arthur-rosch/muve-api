import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '../../../use-cases/erros'
import { makeGetVideoByIdUseCase } from '../../../use-cases/factories/video/make-get-video-by-id'

export async function getVideoById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getVideoByIdParamsSchema = z.object({
    videoId: z.string(),
  })

  const { videoId } = getVideoByIdParamsSchema.parse(request.params)

  try {
    const getVideoByIdUseCase = makeGetVideoByIdUseCase()

    const video = await getVideoByIdUseCase.execute({
      videoId,
    })
    console.log(video)
    return reply.status(200).send(video)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
