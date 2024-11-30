import { PrismaEmailVerificationRepository } from '@/repositories/prisma'
import { SendVerificationCodeUseCase } from '../../cases/email-verification/send-verification-code'

export function makeSendVerificationCodeUseCase() {
  const emailVerificationRepository = new PrismaEmailVerificationRepository()

  const sendVerificationCodeUseCase = new SendVerificationCodeUseCase(
    emailVerificationRepository,
  )

  return sendVerificationCodeUseCase
}
