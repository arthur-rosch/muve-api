import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros'
import { makeDeleteFolderUseCase } from '../../../use-cases/factories/folder/make-delete-folder-use-case'

export async function deleteFolder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteFolderBodySchema = z.object({
    folderId: z.string(),
  })

  const { folderId } = deleteFolderBodySchema.parse(request.params)
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const deleteFolderUseCase = makeDeleteFolderUseCase()

    const folder = await deleteFolderUseCase.execute({
      userId,
      folderId,
    })

    return reply.status(200).send(folder)
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
