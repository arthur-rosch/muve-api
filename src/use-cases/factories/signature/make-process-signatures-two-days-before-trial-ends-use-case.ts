import { PrismaSignaturesRepository } from '../../../repositories/prisma'
import { ProcessSignaturesTwoDaysBeforeTrialEndsUseCase } from '../../cases/signature/process-signatures-two-days-before-trial-ends'

export function makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase() {
  const signatureRepository = new PrismaSignaturesRepository()

  const processSignaturesTwoDaysBeforeTrialEndsUseCase =
    new ProcessSignaturesTwoDaysBeforeTrialEndsUseCase(signatureRepository)

  return processSignaturesTwoDaysBeforeTrialEndsUseCase
}
