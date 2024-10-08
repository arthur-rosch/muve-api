import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { checkSignatureMiddleware } from '@/http/middlewares/verify-signature'

import { createFolder } from './create-folder'
import { deleteFolder } from './delete-folder'
import { getFolderById } from './get-folder-by-id'
import { addFavoriteFolder } from './add-favorite-folder'
import { getManyFolderByUserId } from './get-many-folders-by-user-id'

export async function foldersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  app.addHook('onRequest', checkSignatureMiddleware)

  app.post('/folder', createFolder)
  app.post('/folder/favorite', addFavoriteFolder)
  app.get('/folder/:folderId', getFolderById)
  app.delete('/folder/:folderId', deleteFolder)
  app.get('/folder/all', getManyFolderByUserId)
}
