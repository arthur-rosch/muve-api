import { FindByEmailUseCase } from '../../cases/users/find-by-email'
import { PrimasUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeFindByEmailUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const findByEmailUseCase = new FindByEmailUseCase(usersRepository)

  return findByEmailUseCase
}
