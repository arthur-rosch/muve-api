import { FastifyInstance } from 'fastify'

import { register } from './register'
import { checkJwt } from './checkJwt'
import { checkEmail } from './checkEmail'
import { authenticate } from './authenticate'
import { updateEmail } from './update-email'
import { updatePassword } from './update-password'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { checkSignatureMiddleware } from '@/http/middlewares/verify-signature'
import { updateProfile } from './update-profile'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/check/email', checkEmail)

  /** Authenticated **/
  app.get(
    '/checkJwt',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    checkJwt,
  )
  app.post(
    '/update/email',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    updateEmail,
  )
  app.post(
    '/update/password',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    updatePassword,
  )
  app.post(
    '/update/profile',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    updateProfile,
  )
}
