import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '@/use-cases/erros'
import { makeDeleteVideoUseCase } from '@/use-cases/factories/video/make-delete-video-use-case'

export async function deleteVideo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteVideoParamsSchema = z.object({
    videoId: z.string(),
  })

  const { videoId } = deleteVideoParamsSchema.parse(request.params)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const deleteVideoUseCase = makeDeleteVideoUseCase()

    const video = await deleteVideoUseCase.execute({
      userId,
      videoId,
    })

    return reply.status(200).send(video)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
