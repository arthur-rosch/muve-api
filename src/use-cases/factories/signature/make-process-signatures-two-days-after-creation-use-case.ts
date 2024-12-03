import { PrismaSignaturesRepository } from '../../../repositories/prisma'
import { ProcessSignaturesTwoDaysAfterCreationUseCase } from '../../cases/signature/process-signatures-two-days-after-creation'

export function makeProcessSignaturesTwoDaysAfterCreationUseCase() {
  const signatureRepository = new PrismaSignaturesRepository()

  const processSignaturesTwoDaysAfterCreationUseCase =
    new ProcessSignaturesTwoDaysAfterCreationUseCase(signatureRepository)

  return processSignaturesTwoDaysAfterCreationUseCase
}
