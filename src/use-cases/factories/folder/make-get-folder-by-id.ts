import { GetFolderByIdUseCase } from '../../cases/folder/get-folder-by-id'
import {
  PrimasUsersRepository,
  PrismaFoldersRepository,
} from '@/repositories/prisma'

export function makeGetFolderByIdUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const folderRepository = new PrismaFoldersRepository()

  const getFolderByIdUseCase = new GetFolderByIdUseCase(
    usersRepository,
    folderRepository,
  )

  return getFolderByIdUseCase
}
