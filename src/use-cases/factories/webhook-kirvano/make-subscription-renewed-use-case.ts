import { SubscriptionsRenewedUseCase } from '../../cases/webhook-kirvano/subscriptionsRenewed'
import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '../../../repositories/prisma'

export function makeSubscriptionsRenewedUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signatureRepository = new PrismaSignaturesRepository()

  const subscriptionsRenewedUseCase = new SubscriptionsRenewedUseCase(
    usersRepository,
    signatureRepository,
  )

  return subscriptionsRenewedUseCase
}
