import { PrimasUsersRepository, PrismaValidationPhoneRepository } from '@/repositories/prisma';
import { ValidatePhoneAuthUseCase } from '@/use-cases/cases/auth/validation-code-telephone'


export function makeValidationVerificationCodeUseCase() {
  const phoneAuthRepository = new PrismaValidationPhoneRepository()
  const userRepository = new PrimasUsersRepository()
  const phoneAuthUseCase = new ValidatePhoneAuthUseCase(userRepository, phoneAuthRepository)

  return phoneAuthUseCase
}
