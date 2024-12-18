import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { createVideo } from './create'
import { deleteVideo } from './delete'
import { getVideoById } from './get-video-by-id'
import { editPlayerVideo } from './edit-player-video'
import { getManyVideoByUserId } from './get-many-videos-by-user-id'
import { getManyVideoNotFolderId } from './get-many-videos-not-folder-id'

import checkSignatureMiddleware from '../../middlewares/verify-signature'
import checkVideoLimitMiddleware from '../../middlewares/verify-limit'
import { editFolderIdVideo } from './edit-folderId-video'
import { getManyVideoContainFormByUserId } from './get-many-videos-containt-form-by-user-id'

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

  app.post(
    '/edit/player/video/:videoId',
    {
      onRequest: [verifyJwt, checkSignatureMiddleware],
    },
    editPlayerVideo,
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

  app.post(
    '/edit/folder/video',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    editFolderIdVideo,
  )

  app.get(
    '/video/all',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    getManyVideoByUserId,
  )

  app.get(
    '/video/form',
    { onRequest: [verifyJwt, checkSignatureMiddleware] },
    getManyVideoContainFormByUserId,
  )
}
