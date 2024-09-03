import { SubscriptionCanceledUseCase } from '../../cases/webhook-kirvano/subscriptionCanceled'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'

export function makeSubscriptionCanceledUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videosRepository = new PrimasVideosRepository()
  const signatureRepository = new PrismaSignaturesRepository()

  const subscriptionCanceledUseCase = new SubscriptionCanceledUseCase(
    usersRepository,
    videosRepository,
    signatureRepository,
  )

  return subscriptionCanceledUseCase
}
