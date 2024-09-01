import { z } from 'zod'
import { NotFoundErros } from '@/use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeAddViewTimestampsUseCase } from '@/use-cases/factories/videoAnalytics/make-add-view-timestamps-use-case'

export async function addViewTimestamps(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addViewTimestampsBodySchema = z.object({
    videoId: z.string(),
    userIp: z.string(), // Adiciona userIp
    deviceType: z.string(), // Adiciona deviceType
    agent: z.string(), // Adiciona agent
    country: z.string(), // Adiciona country
    region: z.string(), // Adiciona region
    city: z.string(), // Adiciona city
    endTimestamp: z.number(),
    startTimestamp: z.number(),
  })

  const {
    videoId,
    endTimestamp,
    startTimestamp,
    userIp,
    deviceType,
    agent,
    country,
    region,
    city,
  } = addViewTimestampsBodySchema.parse(request.body)

  try {
    const addViewTimestampsUseCase = makeAddViewTimestampsUseCase()

    const videoAnalytics = await addViewTimestampsUseCase.execute({
      videoId,
      endTimestamp,
      startTimestamp,
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
