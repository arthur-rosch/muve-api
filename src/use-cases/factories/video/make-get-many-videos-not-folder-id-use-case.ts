import { GetManyVideoNotFolderIdUseCase } from '../../cases/video/get-many-videos-not-folder-id'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
} from '@/repositories/prisma'

export function makeGetManyVideoNotFolderIdUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const getManyVideoNotFolderIdUseCase = new GetManyVideoNotFolderIdUseCase(
    usersRepository,
    videoRepository,
  )

  return getManyVideoNotFolderIdUseCase
}
