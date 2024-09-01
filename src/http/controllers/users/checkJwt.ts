import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '@/use-cases/erros/'
import { makeCheckJwtUseCase } from '@/use-cases/factories/user/make-checkJwt-use-case'

export async function checkJwt(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const checkJwtUseCase = makeCheckJwtUseCase()

    const { user } = await checkJwtUseCase.execute({
      userId,
    })

    user.password_hash = ''

    return reply.status(200).send({
      user,
    })
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
