import Stripe from 'stripe'
import { NotFoundErros } from '@/use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckoutExpiredUseCase } from '@/use-cases/factories/webhook-stripe/make-checkout-expired-use-case'

export async function checkoutExpired(
  request: FastifyRequest,
  reply: FastifyReply,
  object: Stripe.Response<Stripe.Checkout.Session>,
) {
  try {
    const checkoutExpiredUseCase = makeCheckoutExpiredUseCase()

    const { emailSend } = await checkoutExpiredUseCase.execute({
      leadId: object.client_reference_id,
    })

    return reply.status(200).send({
      message: `Email send: ${emailSend}`,
    })
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
