import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '@/use-cases/erros'
import { makeCreateVideoUseCase } from '@/use-cases/factories/video/make-create-video-use-case'

export async function createVideo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const chapterSchema = z.object({
    title: z.string().nonempty(),
    startTime: z.string().nonempty(),
    endTime: z.string().nonempty(),
  })

  const createVideoBodySchema = z.object({
    url: z.string(),
    type: z.enum(['Vsl', 'Curso']),
    format: z.enum(['9/16', '16/9']),
    name: z.string(),
    duration: z.string(),
    folderId: z.string().optional(),
    colorProgress: z.string().optional(),
    fictitiousProgress: z.boolean().optional(),
    chapters: z.array(chapterSchema).optional(),
    receiveNotification: z.boolean(),
  })

  const {
    url,
    name,
    type,
    format,
    folderId,
    duration,
    chapters,
    colorProgress,
    fictitiousProgress,
    receiveNotification
  } = createVideoBodySchema.parse(request.body)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const createVideoUseCase = makeCreateVideoUseCase()

    const video = await createVideoUseCase.execute({
      url,
      name,
      type,
      userId,
      format,
      folderId,
      duration,
      chapters,
      colorProgress,
      fictitiousProgress,
      receiveNotification
    })

    return reply.status(201).send(video)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
