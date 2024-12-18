import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros';
import { makeGetAllLeadsFormsByVideoIdUseCase } from '../../../use-cases/factories/video-form/make-get-all-leads-by-video-id';

export async function getAllLeadsFormsByVideoId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    videoId: z.string(),
  });

  const { videoId } = paramsSchema.parse(request.params);

  try {
    const userId = request.user?.sub;

    if (!userId) {
      return reply.status(401).send({ message: 'User not authenticated' });
    }

    const getAllLeadsFormsByVideoIdUseCase =
      makeGetAllLeadsFormsByVideoIdUseCase();

    const { leadFormVideos } = await getAllLeadsFormsByVideoIdUseCase.execute({
      videoId,
      userId,
    });

    return reply.status(200).send({ leadFormVideos });
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
