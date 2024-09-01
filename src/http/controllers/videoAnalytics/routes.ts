import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { addViewTimestamps } from './add-view-timestamps'
import { getAnalyticsByVideoId } from './get-analytics-by-video-id'
import { addViewUnique } from './add-view-unique'

export async function analyticsRoutes(app: FastifyInstance) {
  app.get(
    '/analytic/:videoId',
    { onRequest: [verifyJwt] },
    getAnalyticsByVideoId,
  )
  app.post('/add/analytics', addViewTimestamps)
  app.post('/analytics/views', addViewUnique)
}
