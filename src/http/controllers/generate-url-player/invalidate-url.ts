import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeInvalidateTokenUseCase } from '../../../use-cases/factories/tokenPlayer/make-invalidate-token-use-case'

export async function invalidateToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const invalidateTokenBodySchema = z.object({
    token: z.string(),
  })

  const { token } = invalidateTokenBodySchema.parse(request.body)

  try {
    const invalidateTokenUseCase = makeInvalidateTokenUseCase()
    await invalidateTokenUseCase.execute(token)

    return reply.status(200).send({ message: 'Token invalidated successfully' })
  } catch (err) {
    return reply.status(500).send({ message: err.message })
  }
}
