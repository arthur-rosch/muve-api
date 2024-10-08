import { FastifyInstance } from 'fastify'

import { register } from './register'
import { checkJwt } from './checkJwt'
import { checkEmail } from './checkEmail'
import { authenticate } from './authenticate'
import { updateEmail } from './update-email'
import { updateProfile } from './update-profile'
import { updatePassword } from './update-password'
import { forgotPassword } from './forgot-password'
import { AddInfoFirstAccess } from './add-info-first-access'
import { generatePasswordResetToken } from './generatePasswordResetToken'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { checkSignatureMiddleware } from '@/http/middlewares/verify-signature'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.post('/check/email', checkEmail)
  app.post('/send/password', generatePasswordResetToken)
  app.post('/forgot/password', { onRequest: [verifyJwt] }, forgotPassword)

  /** Authenticated **/
  app.get(
    '/checkJWT',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    checkJwt,
  )
  app.post(
    '/first/access',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    AddInfoFirstAccess,
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
