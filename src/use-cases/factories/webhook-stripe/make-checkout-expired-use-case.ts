import { PrismaLeadsRepository } from '../../../repositories/prisma'
import { CheckoutExpiredUseCase } from '../../cases/webhook-stripe/checkout-expired'

export function makeCheckoutExpiredUseCase() {
  const leadsRepository = new PrismaLeadsRepository()

  const checkoutExpiredUseCase = new CheckoutExpiredUseCase(leadsRepository)

  return checkoutExpiredUseCase
}
