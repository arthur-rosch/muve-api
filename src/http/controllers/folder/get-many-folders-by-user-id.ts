import { FastifyReply, FastifyRequest } from 'fastify'

import { NotFoundErros } from '@/use-cases/erros'
import { makeGetManyFoldersByUserIdUseCase } from '@/use-cases/factories/folder/make-get-many-folders-by-user-id'

export async function getManyFolderByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const getManyFolderByUserIdUseCase = makeGetManyFoldersByUserIdUseCase()

    const folders = await getManyFolderByUserIdUseCase.execute({
      userId,
    })
    console.log(folders)
    return reply.status(200).send(folders)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
