import { UpdateEmailUseCase } from '../../cases/users/update-email'
import { PrimasUsersRepository } from '../../../repositories/prisma/prisma-user-repository'

export function makeUpdateEmailUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const updateEmailUseCase = new UpdateEmailUseCase(usersRepository)

  return updateEmailUseCase
}
