import { AddViewUniquesUseCase } from '../../cases/videoAnalytics/add-view-unique'
import {
  PrimasVideosRepository,
  PrimasVideoAnalyticsRepository,
  PrimasViewUniqueRepository,
} from '../../../repositories/prisma'

export function makeAddViewUniquesUseCase() {
  const videoRepository = new PrimasVideosRepository()
  const viewUniqueRepository = new PrimasViewUniqueRepository()
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository()

  const addViewUniquesUseCase = new AddViewUniquesUseCase(
    videoRepository,
    viewUniqueRepository,
    videoAnalyticsRepository,
  )

  return addViewUniquesUseCase
}
