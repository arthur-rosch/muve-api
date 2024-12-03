import { sendEmail } from '../../../services'
import { Signature } from '@prisma/client'
import { OnboardingEmail } from '../../../templates'
import { SignaturesRepository } from '../../../repositories'

interface ProcessSignaturesTwoDaysAfterCreationResponse {
  processedSignatures: Signature[]
}

export class ProcessSignaturesTwoDaysAfterCreationUseCase {
  constructor(private signaturesRepository: SignaturesRepository) {}

  async execute(): Promise<ProcessSignaturesTwoDaysAfterCreationResponse> {
    const signatures =
      await this.signaturesRepository.getSignaturesTwoDaysAfterCreation()
    console.log(signatures)
    await Promise.all(
      signatures.map(async (signature) => {
        const onboardingHtml = OnboardingEmail({
          name: signature.user.name,
        })

        await sendEmail({
          html: onboardingHtml,
          to: signature.user.email,
          from: 'contato@muveplayer.com',
          subject: 'Vamos explorar juntos? Comece agora com o Muve 🚀',
        })
      }),
    )

    return { processedSignatures: signatures }
  }
}
