import { CreateSignatureUseCase } from '../../cases/signature/create'
import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '../../../repositories/prisma'

export function makeCreateSignatureUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signatureRepository = new PrismaSignaturesRepository()

  const createSignatureUseCase = new CreateSignatureUseCase(
    usersRepository,
    signatureRepository,
  )

  return createSignatureUseCase
}
