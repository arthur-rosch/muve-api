import cron from 'node-cron'
import { makeProcessSignaturesAtHalfTrialUseCase } from '../../../use-cases/factories/signature/make-process-signatures-at-half-trial-use-case'
import { makeProcessSignaturesTwoDaysAfterCreationUseCase } from '../../../use-cases/factories/signature/make-process-signatures-two-days-after-creation-use-case'
import { makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase } from '../../../use-cases/factories/signature/make-process-signatures-two-days-before-trial-ends-use-case'

const processSignaturesAtHalfTrialUseCase =
  makeProcessSignaturesAtHalfTrialUseCase()

const processSignaturesTwoDaysAfterCreationUseCase =
  makeProcessSignaturesTwoDaysAfterCreationUseCase()

const processSignaturesTwoDaysBeforeTrialEndsUseCase =
  makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase()

cron.schedule('0 0 * * *', async () => {
  await processSignaturesTwoDaysAfterCreationUseCase.execute()
})

cron.schedule('0 0 * * *', async () => {
  await processSignaturesAtHalfTrialUseCase.execute()
})

cron.schedule('0 0 * * *', async () => {
  await processSignaturesTwoDaysBeforeTrialEndsUseCase.execute()
})
