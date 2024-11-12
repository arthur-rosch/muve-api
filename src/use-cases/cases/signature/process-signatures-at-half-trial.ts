import { sendEmail } from '@/services'
import { Signature } from '@prisma/client'
import { HalfJourneyEmail } from '@/templates'
import { SignaturesRepository } from '@/repositories'

interface ProcessSignaturesAtHalfTrialResponse {
  processedSignatures: Signature[]
}

export class ProcessSignaturesAtHalfTrialUseCase {
  constructor(private signaturesRepository: SignaturesRepository) {}

  async execute(): Promise<ProcessSignaturesAtHalfTrialResponse> {
    const signatures =
      await this.signaturesRepository.getSignaturesAtHalfTrial()

    console.log(signatures)

    await Promise.all(
      signatures.map(async (signature) => {
        const onboardingHtml = HalfJourneyEmail()

        await sendEmail({
          html: onboardingHtml,
          to: signature.user.email,
          from: 'contato@muveplayer.com',
          subject:
            'Aproveite ao máximo o Muve! Descubra tudo que você pode fazer',
        })
      }),
    )

    return { processedSignatures: signatures }
  }
}
