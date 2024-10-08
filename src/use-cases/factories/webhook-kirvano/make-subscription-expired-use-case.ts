import { SubscriptionExpiredUseCase } from '../../cases/webhook-kirvano/subscriptionExpired'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'

export function makeSubscriptionExpiredUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videosRepository = new PrimasVideosRepository()
  const signatureRepository = new PrismaSignaturesRepository()

  const subscriptionExpiredUseCase = new SubscriptionExpiredUseCase(
    usersRepository,
    videosRepository,
    signatureRepository,
  )

  return subscriptionExpiredUseCase
}
