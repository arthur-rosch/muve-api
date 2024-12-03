import Stripe from 'stripe'
import { NotFoundErros } from '../../../use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeInvoicePaymentFailedUseCase } from '../../../use-cases/factories/webhook-stripe/make-invoice-payment-failed-use-case'

export async function invoicePaymentFailed(
  reply: FastifyReply,
  request: FastifyRequest,
  object: Stripe.Response<Stripe.Invoice>,
) {
  try {
    const invoicePaymentFailedUseCase = makeInvoicePaymentFailedUseCase()

    const { updatedSignature } = await invoicePaymentFailedUseCase.execute({
      invoiceId: object.id,
      subscriptionId: String(object.subscription),
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
