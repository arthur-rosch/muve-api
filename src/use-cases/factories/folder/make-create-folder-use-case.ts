import { CreateFolderUseCase } from '../../cases/folder/create'
import {
  PrimasUsersRepository,
  PrismaFoldersRepository,
} from '@/repositories/prisma'

export function makeCreateFolderUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const folderRepository = new PrismaFoldersRepository()

  const createFolderUseCase = new CreateFolderUseCase(
    usersRepository,
    folderRepository,
  )

  return createFolderUseCase
}
