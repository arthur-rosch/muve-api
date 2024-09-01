import { UpdateTotalViewsUseCase } from '../../cases/videoAnalytics/update-total-views'
import {
  PrimasVideosRepository,
  PrimasVideoAnalyticsRepository,
} from '@/repositories/prisma'

export function makeUpdateTotalViewsUseCase() {
  const videoRepository = new PrimasVideosRepository()
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository()

  const updateTotalViewsUseCase = new UpdateTotalViewsUseCase(
    videoRepository,
    videoAnalyticsRepository,
  )

  return updateTotalViewsUseCase
}
