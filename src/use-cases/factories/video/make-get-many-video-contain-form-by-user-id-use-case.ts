import { GetManyVideoContainFormByUserIdUseCase } from '../../cases/video/get-many-videos-contain-form-by-user-id'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
} from '../../../repositories/prisma'

export function makeGetManyVideoContainFormByUserIdUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const getManyVideoContainFormByUserIdUseCase = new GetManyVideoContainFormByUserIdUseCase(
    usersRepository,
    videoRepository,
  )

  return getManyVideoContainFormByUserIdUseCase
}