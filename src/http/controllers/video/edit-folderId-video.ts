import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros'
import { makeEditFolderIdVideoUseCase } from '../../../use-cases/factories/video/make-edit-folderId-vide-use-case'

export async function editFolderIdVideo(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editFolderIdVideoBodySchema = z.object({
    videoId: z.string(),
    folderId: z.string(),
  })

  const { videoId, folderId } = editFolderIdVideoBodySchema.parse(request.body)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  try {
    const editFolderIdVideoUseCase = makeEditFolderIdVideoUseCase()

    const { video } = await editFolderIdVideoUseCase.execute({
      userId,
      videoId,
      folderId,
    })

    return reply.status(200).send(video)
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
