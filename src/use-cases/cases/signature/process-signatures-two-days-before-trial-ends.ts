import { sendEmail } from '../../../services'
import { Signature } from '@prisma/client'
import { TrialEndingSoonEmail } from '../../../templates'
import { SignaturesRepository } from '../../../repositories'

interface ProcessSignaturesTwoDaysBeforeTrialEndsResponse {
  processedSignatures: Signature[]
}

export class ProcessSignaturesTwoDaysBeforeTrialEndsUseCase {
  constructor(private signaturesRepository: SignaturesRepository) {}

  async execute(): Promise<ProcessSignaturesTwoDaysBeforeTrialEndsResponse> {
    const signatures =
      await this.signaturesRepository.getSignaturesTwoDaysBeforeTrialEnds()

    await Promise.all(
      signatures.map(async (signature) => {
        const trialEndingSoonHtml = TrialEndingSoonEmail({
          name: signature.user.name,
        })

        await sendEmail({
          html: trialEndingSoonHtml,
          to: signature.user.email,
          from: 'contato@muveplayer.com',
          subject:
            'Faltam só 2 dias para o fim do seu trial! Aproveite ao máximo',
        })
      }),
    )

    return { processedSignatures: signatures }
  }
}
