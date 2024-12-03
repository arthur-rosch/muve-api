import { PrismaEmailVerificationRepository } from '../../../repositories/prisma'
import { ValidationCodeCodeUseCase } from '../../cases/email-verification/validation-code'

export function makeValidationCodeCodeUseCase() {
  const emailVerificationRepository = new PrismaEmailVerificationRepository()

  const validationCodeCodeUseCase = new ValidationCodeCodeUseCase(
    emailVerificationRepository,
  )

  return validationCodeCodeUseCase
}
