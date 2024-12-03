import { z } from 'zod'
import { NotFoundErros } from '../../../use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeUpdateTotalViewsUseCase } from '../../../use-cases/factories/videoAnalytics/make-update-view-use-case'

export async function updateTotalViews(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateTotalViewsParamsSchema = z.object({
    videoId: z.string().optional(),
  })

  const { videoId } = updateTotalViewsParamsSchema.parse(request.params)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const updateTotalViewsUseCase = makeUpdateTotalViewsUseCase()

    const videoAnalytics = await updateTotalViewsUseCase.execute({
      videoId,
    })

    return reply.status(200).send(videoAnalytics)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
