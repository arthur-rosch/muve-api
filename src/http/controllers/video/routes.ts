import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createVideo } from './create'
import { deleteVideo } from './delete'
import { getVideoById } from './get-video-by-id'
import { getManyVideoByUserId } from './get-many-videos-by-user-id'
import { getManyVideoNotFolderId } from './get-many-videos-not-folder-id'
import checkSignatureMiddleware from '@/http/middlewares/verify-signature'
import checkVideoLimitMiddleware from '@/http/middlewares/verify-limit'

export async function videosRoutes(app: FastifyInstance) {
  app.get('/video/:videoId', getVideoById)

  app.post(
    '/video',
    {
      onRequest: [
        verifyJwt,
        checkSignatureMiddleware,
        checkVideoLimitMiddleware,
      ],
    },
    createVideo,
  )
  app.get(
    '/video/not/folder',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    getManyVideoNotFolderId,
  )
  app.delete(
    '/video/:videoId',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    deleteVideo,
  )
  app.get(
    '/video/all',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    getManyVideoByUserId,
  )
}
