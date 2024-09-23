import { z } from 'zod'
import { NotFoundErros } from '@/use-cases/erros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSubscriptionsRenewedUseCase } from '@/use-cases/factories/webhook-kirvano/make-subscription-renewed-use-case'

export async function subscriptionRenewed(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const subscriptionRenewedEventSchema = z.object({
    event: z.string(),
    status: z.string(),
    payment_method: z.string(),
    plan: z.object({
      name: z.string(),
      charge_frequency: z.string(),
      next_charge_date: z.string(),
    }),
    customer: z.object({
      name: z.string(),
      document: z.string(),
      email: z.string().email(),
      phone_number: z.string(),
    }),
    type: z.string(),
    sale_id: z.string(),
    checkout_id: z.string(),
    total_price: z.string(),
    products: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        photo: z.string().url(),
        price: z.string(),
        offer_id: z.string(),
        offer_name: z.string(),
        description: z.string(),
        is_order_bump: z.boolean(),
      }),
    ),
  })

  const {
    event,
    plan,
    status,
    customer,
    sale_id,
    checkout_id,
    total_price,
    type,
    payment_method,
    products,
  } = subscriptionRenewedEventSchema.parse(request.body)

  try {
    if (event === 'SUBSCRIPTION_RENEWED') {
      const subscriptionsRenewedUseCase = makeSubscriptionsRenewedUseCase()

      const { subscriptionsRenewed } =
        await subscriptionsRenewedUseCase.execute({
          status,
          email: customer.email,

          payment_method,
          price: total_price,

          plan: products[0].offer_name,
          chargeFrequency: plan.charge_frequency,
          next_charge_date: plan.next_charge_date,

          kirvano_type: type,
          kirvano_sale_id: sale_id,
          kirvano_checkout_id: checkout_id,
        })

      return reply.status(200).send({
        subscriptionsRenewed,
      })
    }
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
