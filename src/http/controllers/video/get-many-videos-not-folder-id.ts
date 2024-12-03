import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '../../../use-cases/erros'
import { makeGetManyVideoNotFolderIdUseCase } from '../../../use-cases/factories/video/make-get-many-videos-not-folder-id-use-case'

export async function getManyVideoNotFolderId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  try {
    const getManyVideoNotFolderIdUseCase = makeGetManyVideoNotFolderIdUseCase()

    const videos = await getManyVideoNotFolderIdUseCase.execute({
      userId,
    })

    return reply.status(200).send(videos)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
