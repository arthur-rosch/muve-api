import { GetVideoByIdUseCase } from '../../cases/video/get-video-by-id'
import { PrimasVideosRepository } from '@/repositories/prisma'

export function makeGetVideoByIdUseCase() {
  const videoRepository = new PrimasVideosRepository()
  const getVideoByIdUseCase = new GetVideoByIdUseCase(videoRepository)

  return getVideoByIdUseCase
}
