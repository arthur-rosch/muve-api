import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { getManySignatureByUserId } from './get-many-by-user-id'

export async function signatureRoutes(app: FastifyInstance) {
  app.get('/signature', { onRequest: [verifyJwt] }, getManySignatureByUserId)
}
