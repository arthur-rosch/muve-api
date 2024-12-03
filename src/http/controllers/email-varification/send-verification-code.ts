import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidVerificationCodeError } from '../../../use-cases/erros'
import { makeSendVerificationCodeUseCase } from '../../../use-cases/factories/email-verification/make-send-verification-code-use-case'

export async function sendVerificationCode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({ email: z.string().email() })

  const { email } = bodySchema.parse(request.body)

  const emailVerificationUseCase = makeSendVerificationCodeUseCase()

  try {
    const emailVerification = await emailVerificationUseCase.execute({
      email,
    })

    return reply.status(201).send(emailVerification)
  } catch (error) {
    if (error instanceof InvalidVerificationCodeError) {
      return reply.status(409).send({ message: error.message })
    }
    return reply.status(400).send({ message: error.message })
  }
}
