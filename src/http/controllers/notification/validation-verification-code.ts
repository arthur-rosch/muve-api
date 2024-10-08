import { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundErros } from '@/use-cases/erros'
import { makeValidationVerificationCodeUseCase } from '@/use-cases/factories/user/make-validation-code-telephone';
import { z } from 'zod';

export async function validateVerificationCode(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkEmailBodySchema = z.object({
    telephone: z.string()
      .min(10, 'Número de telefone inválido')
      .max(15, 'Número de telefone inválido'),
      
    code: z.string()
      .length(6, 'O código deve ter exatamente 6 dígitos')
      .regex(/^\d{6}$/, 'O código deve conter apenas números'),
  })

  const { code, telephone } = checkEmailBodySchema.parse(request.body)
  
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
  try {
    const validationVerificationCodeTelephone = makeValidationVerificationCodeUseCase()


    const isValidCode = await validationVerificationCodeTelephone.execute({
      authCode: code,
      telephone,
      userId
    })

    return reply.status(200).send({valid: isValidCode})
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
