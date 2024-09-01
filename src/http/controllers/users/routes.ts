import { FastifyInstance } from 'fastify'

import { register } from './register'
import { checkJwt } from './checkJwt'
import { authenticate } from './authenticate'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated **/
  app.get('/checkJwt', { onRequest: [verifyJwt] }, checkJwt)
}
