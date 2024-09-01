import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createFolder } from './create-folder'
import { deleteFolder } from './delete-folder'
import { getFolderById } from './get-folder-by-id'
import { getManyFolderByUserId } from './get-many-folders-by-user-id'

export async function foldersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/folder', createFolder)
  app.get('/folder/:folderId', getFolderById)
  app.delete('/folder/:folderId', deleteFolder)
  app.get('/folder/all', getManyFolderByUserId)
}
