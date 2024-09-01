import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createVideo } from './create'
import { deleteVideo } from './delete'
import { getVideoById } from './get-video-by-id'
import { getManyVideoByUserId } from './get-many-videos-by-user-id'

export async function videosRoutes(app: FastifyInstance) {
  app.get('/video/:videoId', getVideoById)

  app.post('/video', { onRequest: [verifyJwt] }, createVideo)
  app.delete('/video/:videoId', { onRequest: [verifyJwt] }, deleteVideo)
  app.get('/video/all', { onRequest: [verifyJwt] }, getManyVideoByUserId)
}
