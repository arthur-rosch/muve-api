import { z } from 'zod'
import { NotFoundErros } from '../../../use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAddViewUniquesUseCase } from '../../../use-cases/factories/videoAnalytics/make-add-view-use-case'

export async function addViewUnique(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addViewUniqueBodySchema = z.object({
    videoId: z.string(),
    userIp: z.string(),
    deviceType: z.string(),
    agent: z.string(),
    country: z.string(),
    region: z.string(),
    city: z.string(),
  })

  const { videoId, userIp, deviceType, agent, country, region, city } =
    addViewUniqueBodySchema.parse(request.body)

  try {
    const addViewUniqueUseCase = makeAddViewUniquesUseCase()

    const videoAnalytics = await addViewUniqueUseCase.execute({
      videoId,
      userIp,
      deviceType,
      agent,
      country,
      region,
      city,
    })

    return reply.status(201).send(videoAnalytics)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
