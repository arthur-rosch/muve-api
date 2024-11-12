import { GetVideoByIdUseCase } from '../../cases/video/get-video-by-id'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'

export function makeGetVideoByIdUseCase() {
  const videoRepository = new PrimasVideosRepository()
  const usersRepository = new PrimasUsersRepository()
  const signatureRepository = new PrismaSignaturesRepository()

  const getVideoByIdUseCase = new GetVideoByIdUseCase(
    usersRepository,
    videoRepository,
    signatureRepository,
  )

  return getVideoByIdUseCase
}
