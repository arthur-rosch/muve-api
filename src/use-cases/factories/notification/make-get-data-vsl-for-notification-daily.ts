import { PrimasUsersRepository, PrimasVideosRepository } from '@/repositories/prisma'
import { GetDatasForVslUseCase } from '@/use-cases/cases/notifications/collect-users-datas-for-notifications'

export function makeCollectUsersDatasForNotificationDaily() {
  const videoRepository = new PrimasVideosRepository()
  const userRepository = new PrimasUsersRepository()
  const phoneAuthUseCase = new GetDatasForVslUseCase(userRepository, videoRepository)

  return phoneAuthUseCase
}
