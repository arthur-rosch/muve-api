import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateLeadFormUseCase } from '../../../use-cases/factories/video-form/make-add-lead-use-case';
export async function createLeadForm(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createLeadFormBodySchema = z.object({
    formId: z.string(),
    videoId: z.string(),
    data: z.object({
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    }),
  });

  const { formId, videoId, data } = createLeadFormBodySchema.parse(
    request.body,
  );

  try {
    const createLeadFormUseCase = makeCreateLeadFormUseCase();

    const { leadFormVideo } = await createLeadFormUseCase.execute({
      formId,
      videoId,
      data,
    });

    return reply.status(201).send({ leadFormVideo });
  } catch (err) {
    reply
      .status(500)
      .send({ message: 'Unexpected error occurred', error: err });
  }
}
