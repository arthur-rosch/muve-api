import { FastifyInstance } from 'fastify'

import { register } from './register'
import { checkJwt } from './checkJwt'
import { authenticate } from './authenticate'
import { updateEmail } from './update-email'
import { updatePassword } from './update-password'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated **/
  app.get('/checkJwt', { onRequest: [verifyJwt] }, checkJwt)
  app.post('/update/email', { onRequest: [verifyJwt] }, updateEmail)
  app.post('/update/password', { onRequest: [verifyJwt] }, updatePassword)
}
