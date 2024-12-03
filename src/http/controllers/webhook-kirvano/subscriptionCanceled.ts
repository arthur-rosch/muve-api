import { z } from 'zod'
import { NotFoundErros } from '../../../use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSubscriptionCanceledUseCase } from '../../../use-cases/factories/webhook-kirvano/make-subscription-canceled-use-case'

export async function subscriptionCanceled(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const subscriptionCanceledEventSchema = z.object({
    event: z.string(),
    status: z.string(),
    customer: z.object({
      name: z.string(),
      document: z.string(),
      email: z.string().email(),
      phone_number: z.string(),
    }),
  })

  const { event, status, customer } = subscriptionCanceledEventSchema.parse(
    request.body,
  )

  try {
    if (event === 'SUBSCRIPTION_CANCELED') {
      const subscriptionCanceledUseCase = makeSubscriptionCanceledUseCase()

      const { signature, user } = await subscriptionCanceledUseCase.execute({
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
