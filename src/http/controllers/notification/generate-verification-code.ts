import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { NotFoundErros } from '@/use-cases/erros';
import { makeGenerateVerificationCodeUseCase } from '@/use-cases/factories/user/make-generate-verification-code-use-case';

export async function generateVerificationCode(request: FastifyRequest, reply: FastifyReply) {
  const generateVerificationCodeBodySchema = z.object({
    phone: z.string().min(10, 'Número de telefone inválido').max(15, 'Número de telefone inválido'),
  });

  const { phone } = generateVerificationCodeBodySchema.parse(request.body);

  const userId = request.user?.sub;

  if (!userId) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const generateVerificationCodeUseCase = makeGenerateVerificationCodeUseCase();

    await generateVerificationCodeUseCase.execute({
      userId,
      phone,
    });

    return reply.status(200).send({ message: 'Código de verificação enviado' });
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
