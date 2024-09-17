import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AccessDeniedError, NotFoundErros } from '@/use-cases/erros'
import { makeAddFavoriteUseCase } from '@/use-cases/factories/folder/make-add-favorite-folder-use-case'

export async function addFavoriteFolder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const addFavoriteFolderBodySchema = z.object({
    folderId: z.string(),
    value: z.boolean(),
  })

  const { folderId, value } = addFavoriteFolderBodySchema.parse(request.body)

  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const addFavoriteUseCase = makeAddFavoriteUseCase()

    const folder = await addFavoriteUseCase.execute({
      userId,
      folderId,
      value,
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
