import { RegisterUseCase } from '../../cases/users/register'
import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '@/repositories/prisma'

export function makeRegisterUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signaturesRepository = new PrismaSignaturesRepository()
  const registerUseCase = new RegisterUseCase(
    usersRepository,
    signaturesRepository,
  )

  return registerUseCase
}
