import { PrimasUsersRepository, PrismaValidationPhoneRepository } from '@/repositories/prisma'
import { CreatePhoneAuthUseCase } from '@/use-cases/cases/auth/generate-code-telephone'


export function makeGenerateVerificationCodeUseCase() {
  const phoneAuthRepository = new PrismaValidationPhoneRepository()
  const userRepository = new PrimasUsersRepository()
  const phoneAuthUseCase = new CreatePhoneAuthUseCase(userRepository, phoneAuthRepository)

  return phoneAuthUseCase
}
