import { z } from 'zod'
import { NotFoundErros } from '@/use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSubscriptionExpiredUseCase } from '@/use-cases/factories/webhook-kirvano/make-subscription-expired-use-case'

export async function subscriptionExpired(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const subscriptionExpiredEventSchema = z.object({
    event: z.string(),
    status: z.string(),
    customer: z.object({
      name: z.string(),
      document: z.string(),
      email: z.string().email(),
      phone_number: z.string(),
    }),
  })

  const { event, status, customer } = subscriptionExpiredEventSchema.parse(
    request.body,
  )

  try {
    if (event === 'SUBSCRIPTION_EXPIRED') {
      const subscriptionExpiredUseCase = makeSubscriptionExpiredUseCase()

      const { signature, user } = await subscriptionExpiredUseCase.execute({
        status,
        email: customer.email,
      })

      return reply.status(200).send({
        signature,
        user,
      })
    }
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
