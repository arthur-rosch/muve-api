import { AddViewTimestampsUseCase } from '../../cases/videoAnalytics/add-view-timestamps'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrimasVideoAnalyticsRepository,
  PrimasViewTimestampRepository,
} from '../../../repositories/prisma'

export function makeAddViewTimestampsUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const viewTimestampRepository = new PrimasViewTimestampRepository()
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository()

  const addViewTimestampsUseCase = new AddViewTimestampsUseCase(
    usersRepository,
    videoRepository,
    videoAnalyticsRepository,
    viewTimestampRepository,
  )

  return addViewTimestampsUseCase
}
