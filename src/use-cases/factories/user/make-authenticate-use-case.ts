import { AuthenticateUseCase } from '../../cases/users/authenticate'
import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
  PrismaEmailVerificationRepository,
} from '@/repositories/prisma'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()
  const emailVerificationRepository = new PrismaEmailVerificationRepository()

  const authenticateUseCase = new AuthenticateUseCase(
    usersRepository,
    signaturesRepository,
    emailVerificationRepository,
  )

  return authenticateUseCase
}
