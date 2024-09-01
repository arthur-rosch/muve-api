import { GetManyVideoByUserIdUseCase } from '../../cases/video/get-many-videos-by-user-id'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
} from '@/repositories/prisma'

export function makeGetManyVideoByUserIdUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const getManyVideoByUserIdUseCase = new GetManyVideoByUserIdUseCase(
    usersRepository,
    videoRepository,
  )

  return getManyVideoByUserIdUseCase
}
