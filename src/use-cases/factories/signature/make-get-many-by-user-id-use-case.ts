import { GetManySignatureByUserIdUseCase } from '../../cases/signature/get-many-by-user-id'
import {
  PrimasUsersRepository,
  PrismaSignaturesRepository,
} from '../../../repositories/prisma'

export function makeGetManySignatureByUserIdUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const signatureRepository = new PrismaSignaturesRepository()

  const getManySignatureByUserIdUseCase = new GetManySignatureByUserIdUseCase(
    usersRepository,
    signatureRepository,
  )

  return getManySignatureByUserIdUseCase
}
