import { GetAnalyticsByVideoIdUseCase } from '../../cases/videoAnalytics/get-analytics-by-video-id'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrimasVideoAnalyticsRepository,
} from '../../../repositories/prisma'

export function makeGetAnalyticsByVideoIdUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository()

  const getAnalyticsByVideoIdUseCase = new GetAnalyticsByVideoIdUseCase(
    usersRepository,
    videoRepository,
    videoAnalyticsRepository,
  )

  return getAnalyticsByVideoIdUseCase
}
