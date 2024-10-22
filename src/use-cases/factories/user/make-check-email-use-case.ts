import { CheckEmailUseCase } from '../../cases/users/check-email'
import { PrimasUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeCheckEmailUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const checkEmailUseCase = new CheckEmailUseCase(usersRepository)

  return checkEmailUseCase
}
