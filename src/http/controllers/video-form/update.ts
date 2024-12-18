import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros';
import { makeUpdateVideoFormUseCase } from '../../../use-cases/factories/video-form/make-update-use-case';

export async function updateVideoForm(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateVideoFormBodySchema = z.object({
    videoId: z.string(),
    isActive: z.boolean(),
    inputName: z.boolean(),
    inputEmail: z.boolean(),
    inputPhone: z.boolean(),
  });

  const userId = request.user?.sub;

  const body = updateVideoFormBodySchema.parse(request.body);

  try {
    const updateVideoFormUseCase = makeUpdateVideoFormUseCase();

    const { videoForm } = await updateVideoFormUseCase.execute({
      userId,
      data: body,
      videoId: body.videoId,
    });

    return reply.status(200).send({ videoForm });
  } catch (err) {
    if (err instanceof NotFoundErros) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof AccessDeniedError) {
      return reply.status(403).send({ message: err.message });
    }

    throw err;
  }
}
