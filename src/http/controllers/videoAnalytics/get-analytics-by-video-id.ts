import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros, AccessDeniedError } from '../../../use-cases/erros'
import { makeGetAnalyticsByVideoIdUseCase } from '../../../use-cases/factories/videoAnalytics/make-get-analytics-by-video-id-use-case'

export async function getAnalyticsByVideoId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAnalyticsByVideoIdParamsSchema = z.object({
    videoId: z.string().optional(),
  })

  const { videoId } = getAnalyticsByVideoIdParamsSchema.parse(request.params)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const getAnalyticsByVideoIdUseCase = makeGetAnalyticsByVideoIdUseCase()

    const videoAnalytics = await getAnalyticsByVideoIdUseCase.execute({
      userId,
      videoId,
    })

    return reply.status(200).send(videoAnalytics)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof AccessDeniedError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
