import { UpdatePasswordUseCase } from '../../cases/users/update-password'
import { PrimasUsersRepository } from '../../../repositories/prisma/prisma-user-repository'

export function makeUpdatePasswordUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository)

  return updatePasswordUseCase
}
