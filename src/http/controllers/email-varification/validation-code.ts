import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeValidationCodeCodeUseCase } from "../../../use-cases/factories/email-verification/make-validation-code-use-case";

export async function validateVerificationCode(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({ email: z.string().email(), code: z.string() });

  const { email, code } = bodySchema.parse(request.body);

  const validationCodeCodeUseCase = makeValidationCodeCodeUseCase();

  try {
    const { status } = await validationCodeCodeUseCase.execute({
      email,
      code,
    });

    return reply.status(200).send(status);
  } catch (error) {
    return reply.status(400).send({ message: error.message });
  }
}
