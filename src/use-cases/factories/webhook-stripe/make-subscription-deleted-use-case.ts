import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '../../../repositories/prisma'
import { SubscriptionDeletedUseCase } from '../../cases/webhook-stripe/subscription-deleted'

export function makeSubscriptionDeletedUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()

  const subscriptionDeletedUseCase = new SubscriptionDeletedUseCase(
    usersRepository,
    signaturesRepository,
  )

  return subscriptionDeletedUseCase
}
