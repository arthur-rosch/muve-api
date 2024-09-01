import { AuthenticateUseCase } from '../../cases/users/authenticate'
import { PrimasUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
