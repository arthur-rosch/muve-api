import { RegisterUseCase } from '../../cases/users/register'
import { PrimasUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeRegisterUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
