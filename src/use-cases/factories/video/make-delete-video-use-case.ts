import { DeleteVideoUseCase } from '../../cases/video/delete'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
} from '@/repositories/prisma'

export function makeDeleteVideoUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const deleteVideoUseCase = new DeleteVideoUseCase(
    usersRepository,
    videoRepository,
  )

  return deleteVideoUseCase
}
