import { AddInfoFirstAccessUseCase } from '../../cases/users/add-info-first-access'
import { PrimasUsersRepository } from '../../../repositories/prisma'

export function makeAddInfoFirstAccessUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const addInfoFirstAccessUseCase = new AddInfoFirstAccessUseCase(
    usersRepository,
  )

  return addInfoFirstAccessUseCase
}
