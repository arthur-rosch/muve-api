import { AuthenticateUseCase } from '../../cases/users/authenticate'
import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()
  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    signaturesRepository,
  )

  return authenticateUseCase
}
