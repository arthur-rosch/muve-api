import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AccessDeniedError, NotFoundErros } from '@/use-cases/erros'
import { makeGetFolderByIdUseCase } from '@/use-cases/factories/folder/make-get-folder-by-id'

export async function getFolderById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getFolderByIdBodySchema = z.object({
    folderId: z.string(),
  })

  const { folderId } = getFolderByIdBodySchema.parse(request.params)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const getFolderByIdUseCase = makeGetFolderByIdUseCase()

    const folder = await getFolderByIdUseCase.execute({
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
