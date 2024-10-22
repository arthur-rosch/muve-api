import { UpdateProfileUseCase } from '../../cases/users/update-profile'
import { PrimasUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeUpdateProfileUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const updateProfileUseCase = new UpdateProfileUseCase(usersRepository)

  return updateProfileUseCase
}
