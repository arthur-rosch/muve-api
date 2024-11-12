import Stripe from 'stripe'
import { NotFoundErros } from '@/use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSubscriptionDeletedUseCase } from '@/use-cases/factories/webhook-stripe/make-subscription-deleted-use-case'

export async function subscriptionDeleted(
  reply: FastifyReply,
  request: FastifyRequest,
  object: Stripe.Response<Stripe.Subscription>,
) {
  try {
    const subscriptionDeletedUseCase = makeSubscriptionDeletedUseCase()

    const { updatedSignature } = await subscriptionDeletedUseCase.execute({
      subscriptionId: object.id,
    })

    return reply.status(200).send({
      updatedSignature,
    })
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
