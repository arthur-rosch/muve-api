import { DeleteFolderUseCase } from '../../cases/folder/delete'
import {
  PrimasUsersRepository,
  PrismaFoldersRepository,
} from '../../../repositories/prisma'

export function makeDeleteFolderUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const folderRepository = new PrismaFoldersRepository()

  const deleteFolderUseCase = new DeleteFolderUseCase(
    usersRepository,
    folderRepository,
  )

  return deleteFolderUseCase
}
