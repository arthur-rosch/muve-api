import { PrismaSignaturesRepository } from '@/repositories/prisma'
import { ProcessSignaturesAtHalfTrialUseCase } from '../../cases/signature/process-signatures-at-half-trial'

export function makeProcessSignaturesAtHalfTrialUseCase() {
  const signatureRepository = new PrismaSignaturesRepository()

  const processSignaturesAtHalfTrialUseCase =
    new ProcessSignaturesAtHalfTrialUseCase(signatureRepository)

  return processSignaturesAtHalfTrialUseCase
}
