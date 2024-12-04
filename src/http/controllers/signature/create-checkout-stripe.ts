import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateStripeCheckoutUseCase } from '../../../use-cases/factories/webhook-stripe/make-create-checkout-sessions-use-case'
import { z } from 'zod'
import { NotFoundErros } from '../../../use-cases/erros'

export async function createStripeCheckout(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createStripeBodySchema = z.object({
    plan: z.string(),
    email: z.string().email(),
  })

  const { email, plan } = createStripeBodySchema.parse(request.body)

  try {
    const createStripeCheckoutUseCase = makeCreateStripeCheckoutUseCase()

    const { checkoutUrl } = await createStripeCheckoutUseCase.execute({
      email,
      plan,
    })

    return reply.status(200).send({ checkoutUrl })
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
