import { FastifyInstance } from 'fastify'
import { handleStripeWebhook } from '@/http/middlewares/stripeWebhook'

export async function webhookStripeRoutes(app: FastifyInstance) {
  app.post('/webhook/stripe', { handler: handleStripeWebhook })
}
