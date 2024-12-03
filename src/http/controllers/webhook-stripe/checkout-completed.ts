import Stripe from 'stripe'
import { NotFoundErros } from '../../../use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckoutCompletedUseCase } from '../../../use-cases/factories/webhook-stripe/make-checkout-completed-use-case'

export async function checkoutCompleted(
  request: FastifyRequest,
  reply: FastifyReply,
  object: Stripe.Response<Stripe.Checkout.Session>,
) {
  try {
    const checkoutCompletedUseCase = makeCheckoutCompletedUseCase()

    const { user } = await checkoutCompletedUseCase.execute({
      leadId: object.client_reference_id,
      customerId: String(object.customer),
      subscriptionId: String(object.subscription),
    })

    user.password_hash = ''

    return reply.status(200).send({
      user,
    })
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
