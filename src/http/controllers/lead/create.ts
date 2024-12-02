import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCreateLeadUseCase } from '@/use-cases/factories/lead/make-create-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createLeadBodySchema = z.object({
    plan: z.string(),
    name: z.string(),
    phone: z.string(),
    document: z.string(),
    email: z.string().email(),
  })
  console.log(request.body)
  const { name, email, plan, document, phone } = createLeadBodySchema.parse(
    request.body,
  )

  try {
    const createLeadUseCase = makeCreateLeadUseCase()

    const { checkoutUrl } = await createLeadUseCase.execute({
      plan,
      name,
      email,
      phone,
      document,
    })

    return reply.status(201).send({
      checkoutUrl,
    })
  } catch (err) {
    return reply.status(409).send({ message: err.message })
  }
}
