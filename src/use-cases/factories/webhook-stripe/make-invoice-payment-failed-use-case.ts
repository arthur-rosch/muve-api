import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '../../../repositories/prisma'
import { InvoicePaymentFailedUseCase } from '../../cases/webhook-stripe/invoice-payment-failed'

export function makeInvoicePaymentFailedUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()

  const invoicePaymentFailedUseCase = new InvoicePaymentFailedUseCase(
    usersRepository,
    signaturesRepository,
  )

  return invoicePaymentFailedUseCase
}
