import Stripe from 'stripe'
import { NotFoundErros } from '../../../use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSubscriptionUpdatedUseCase } from '../../../use-cases/factories/webhook-stripe/make-subscription-updated-use-case'

export async function subscriptionUpdate(
  reply: FastifyReply,
  request: FastifyRequest,
  object: Stripe.Response<Stripe.Subscription>,
) {
  try {
    const subscriptionUpdatedUseCase = makeSubscriptionUpdatedUseCase()

    const { updatedSignature } = await subscriptionUpdatedUseCase.execute({
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
