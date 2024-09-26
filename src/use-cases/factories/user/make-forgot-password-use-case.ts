import { ForgotPasswordUseCase } from '../../cases/users/forgot-password'
import { PrimasUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeForgotPasswordUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}
