import { PurchaseApprovedUseCase } from '../../cases/webhook-kirvano/purchaseApproved'
import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'

export function makePurchaseApprovedUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signatureRepository = new PrismaSignaturesRepository()

  const purchaseApprovedUseCase = new PurchaseApprovedUseCase(
    usersRepository,
    signatureRepository,
  )

  return purchaseApprovedUseCase
}
