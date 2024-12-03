import { GetVideoByPlayerIdUseCase } from '../../cases/video/get-config-video-by-player-id'
import { PrimasVideosRepository } from '../../../repositories/prisma'

export function makeGetVideoByPlayerIdUseCase() {
  const videoRepository = new PrimasVideosRepository()
  const getVideoByPlayerIdUseCase = new GetVideoByPlayerIdUseCase(
    videoRepository,
  )

  return getVideoByPlayerIdUseCase
}
