import { CreateVideoUseCase } from '../../cases/video/create'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaFoldersRepository,
  PrismaChaptersRepository,
  PrimasVideoAnalyticsRepository,
} from '../../../repositories/prisma'

export function makeCreateVideoUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const folderRepository = new PrismaFoldersRepository()
  const chaptersRepository = new PrismaChaptersRepository()
  const videoAnalyticsRepository = new PrimasVideoAnalyticsRepository()

  const createVideoUseCase = new CreateVideoUseCase(
    usersRepository,
    videoRepository,
    folderRepository,
    chaptersRepository,
    videoAnalyticsRepository,
  )

  return createVideoUseCase
}
