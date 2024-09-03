import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError, NotFoundErros } from '@/use-cases/erros'
import { makePurchaseApprovedUseCase } from '@/use-cases/factories/webhook-kirvano/make-purchase-approved-use-case'

export async function purchaseApproved(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const purchaseApprovedEventSchema = z.object({
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
  } = purchaseApprovedEventSchema.parse(request.body)

  try {
    if (event === 'SALE_APPROVED') {
      const purchaseApprovedUseCase = makePurchaseApprovedUseCase()

      const { signature, user } = await purchaseApprovedUseCase.execute({
        status,
        name: customer.name,
        email: customer.email,
        phone: customer.phone_number,
        document: customer.document,
        password: customer.document,

        payment_method,
        price: total_price,

        plan: plan.name,
        chargeFrequency: plan.charge_frequency,
        next_charge_date: plan.next_charge_date,

        kirvano_type: type,
        kirvano_sale_id: sale_id,
        kirvano_checkout_id: checkout_id,
      })

      return reply.status(201).send({
        signature,
        user,
      })
    }
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
