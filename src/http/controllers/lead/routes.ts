import { FastifyInstance } from 'fastify'

import { create } from './create'

export async function leadsRoutes(app: FastifyInstance) {
  app.post('/lead', create)
}
