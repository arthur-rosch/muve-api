import { CheckJwtUseCase } from '../../cases/users/checkJwt'
import { PrimasUsersRepository } from '@/repositories/prisma/prisma-user-repository'

export function makeCheckJwtUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const checkJwtUseCase = new CheckJwtUseCase(usersRepository)

  return checkJwtUseCase
}
