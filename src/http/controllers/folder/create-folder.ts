import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { NotFoundErros } from '@/use-cases/erros'
import { makeCreateFolderUseCase } from '@/use-cases/factories/folder/make-create-folder-use-case'

export async function createFolder(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createFolderBodySchema = z.object({
    name: z.string(),
    coverUrl: z.string().optional(),
    videosId: z.array(z.string()).optional(),
  })

  const { name, coverUrl, videosId } = createFolderBodySchema.parse(
    request.body,
  )
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const createFolderUseCase = makeCreateFolderUseCase()

    const folder = await createFolderUseCase.execute({
      name,
      userId,
      coverUrl,
      videosId,
    })

    return reply.status(201).send(folder)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
