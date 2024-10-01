import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '@/use-cases/erros'
import { makeGetManySignatureByUserIdUseCase } from '@/use-cases/factories/signature/make-get-many-by-user-id-use-case'

export async function validateVerificationCode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  try {
    const getManySignatureByUserIdUseCase =
      makeGetManySignatureByUserIdUseCase()

    const { signatures } = await getManySignatureByUserIdUseCase.execute({
      userId,
    })

    return reply.status(200).send(signatures)
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
