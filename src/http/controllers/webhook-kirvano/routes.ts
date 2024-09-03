import { FastifyInstance } from 'fastify'

import { purchaseApproved } from './purchaseApproved'

export async function webhookKirvanoRoutes(app: FastifyInstance) {
  app.post('/webhook/purchase/approved', purchaseApproved)
}
