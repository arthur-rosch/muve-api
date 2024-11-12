import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'
import { InvoicePaymentSucceededUseCase } from '../../cases/webhook-stripe/invoice-payment-succeeded'

export function makeInvoicePaymentSucceededUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()

  const invoicePaymentSucceededUseCase = new InvoicePaymentSucceededUseCase(
    usersRepository,
    signaturesRepository,
  )

  return invoicePaymentSucceededUseCase
}
