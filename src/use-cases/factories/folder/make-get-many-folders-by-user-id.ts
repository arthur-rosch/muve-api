import { GetManyFoldersByUserIdUseCase } from '../../cases/folder/get-many-folders-by-user-id'
import {
  PrimasUsersRepository,
  PrismaFoldersRepository,
} from '../../../repositories/prisma'

export function makeGetManyFoldersByUserIdUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const folderRepository = new PrismaFoldersRepository()

  const getManyFoldersByUserIdUseCase = new GetManyFoldersByUserIdUseCase(
    usersRepository,
    folderRepository,
  )

  return getManyFoldersByUserIdUseCase
}
