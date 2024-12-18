import { FastifyInstance } from 'fastify';

import { updateVideoForm } from './update';
import { createLeadForm } from './add-lead';
import { getAllLeadsFormsByVideoId } from './get-all-leads-by-video-id';

import { verifyJwt } from '../../middlewares/verify-jwt';
import { checkSignatureMiddleware } from '../../middlewares/verify-signature';

export async function videoFormRoutes(app: FastifyInstance) {
  app.get(
    '/form/:videoId',
    {
      onRequest: [verifyJwt, checkSignatureMiddleware],
    },
    getAllLeadsFormsByVideoId,
  );

  app.post(
    '/form/video',
    {
      onRequest: [verifyJwt, checkSignatureMiddleware],
    },
    updateVideoForm,
  );

  app.post('/form/lead', createLeadForm);
}
