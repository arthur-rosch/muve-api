import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'
import { SubscriptionUpdatedUseCase } from '../../cases/webhook-stripe/subscription-updated'

export function makeSubscriptionUpdatedUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()

  const subscriptionUpdatedUseCase = new SubscriptionUpdatedUseCase(
    usersRepository,
    signaturesRepository,
  )

  return subscriptionUpdatedUseCase
}
