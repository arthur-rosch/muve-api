import { AddFavoriteUseCase } from '../../cases/folder/add-favorite'
import {
  PrimasUsersRepository,
  PrismaFoldersRepository,
} from '../../../repositories/prisma'

export function makeAddFavoriteUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const folderRepository = new PrismaFoldersRepository()

  const addFavoriteUseCase = new AddFavoriteUseCase(
    usersRepository,
    folderRepository,
  )

  return addFavoriteUseCase
}
