import { FastifyInstance } from 'fastify'

import { purchaseApproved } from './purchaseApproved'
import { subscriptionExpired } from './subscriptionExpired'
import { subscriptionRenewed } from './subscriptionRenewed'
import { subscriptionCanceled } from './subscriptionCanceled'

export async function webhookKirvanoRoutes(app: FastifyInstance) {
  app.post('/webhook/purchase/approved', purchaseApproved)
  app.post('/webhook/subscription/expired', subscriptionExpired)
  app.post('/webhook/subscription/renewed', subscriptionRenewed)
  app.post('/webhook/subscription/canceled', subscriptionCanceled)
}
