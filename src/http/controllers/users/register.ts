import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/erros'
import { makeRegisterUseCase } from '@/use-cases/factories/user/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    plan: z.string(),
    name: z.string(),
    phone: z.string(),
    document: z.string(),
    email: z.string().email(),
  })

  const { name, email, plan, document, phone } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    const { checkoutUrl } = await registerUseCase.execute({
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
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
