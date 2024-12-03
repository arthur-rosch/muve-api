import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '../../../use-cases/erros'
import { makeRegisterUseCase } from '../../../use-cases/factories/user/make-register-use-case'
import { makeSendVerificationCodeUseCase } from '../../../use-cases/factories/email-verification/make-send-verification-code-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    phone: z.string(),
    document: z.string(),
    password: z.string(),
    email: z.string().email(),
  })

  const { name, email, document, phone, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()
    const sendVerificationCodeUseCase = makeSendVerificationCodeUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      phone,
      document,
      password,
    })

    if (user) {
      sendVerificationCodeUseCase.execute({
        email: user.email,
      })
    }

    user.password_hash = ''

    return reply.status(201).send({ user })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
