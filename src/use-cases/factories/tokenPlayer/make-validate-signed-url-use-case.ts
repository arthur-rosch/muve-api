import { PrismaTokenPlayerRepository } from '@/repositories/prisma'
import { ValidateSignedUrlUseCase } from '../../cases/tokenPlayer/validate-signed-url'

export function makeValidateSignedUrlUseCase() {
  const tokenPlayerRepository = new PrismaTokenPlayerRepository()

  const validateSignedUrlUseCase = new ValidateSignedUrlUseCase(
    tokenPlayerRepository,
  )

  return validateSignedUrlUseCase
}
