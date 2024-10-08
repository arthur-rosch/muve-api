import { FastifyInstance } from 'fastify'
import { generateVerificationCode } from './generate-verification-code'
import { validateVerificationCode } from './validation-verification-code'

export async function notificationRoutes(app: FastifyInstance) {
  app.post('/notification/generateVerificatonCode', generateVerificationCode)
  app.post('/notification/validateVerificationCode', validateVerificationCode)
}
