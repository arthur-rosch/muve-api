import Stripe from 'stripe'
import { NotFoundErros } from '../../../use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeInvoicePaymentSucceededUseCase } from '../../../use-cases/factories/webhook-stripe/make-invoice-payment-succeeded-use-case'

export async function invoicePaymentSucceeded(
  reply: FastifyReply,
  request: FastifyRequest,
  object: Stripe.Response<Stripe.Invoice>,
) {
  try {
    const invoicePaymentSucceededUseCase = makeInvoicePaymentSucceededUseCase()

    const { newSignature } = await invoicePaymentSucceededUseCase.execute({
      invoiceId: object.id,
      customerId: String(object.customer),
      subscriptionId: String(object.subscription),
    })
    return reply.status(200).send({
      newSignature,
    })
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
