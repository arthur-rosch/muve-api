import {
  PrismaLeadsRepository,
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'
import { CheckoutCompletedUseCase } from '../../cases/webhook-stripe/checkout-completed'

export function makeCheckoutCompletedUseCase() {
  const leadsRepository = new PrismaLeadsRepository()
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()

  const checkoutCompletedUseCase = new CheckoutCompletedUseCase(
    leadsRepository,
    usersRepository,
    signaturesRepository,
  )

  return checkoutCompletedUseCase
}
