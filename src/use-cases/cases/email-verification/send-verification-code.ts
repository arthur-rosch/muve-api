import { env } from '@/env'
import { sendEmail } from '@/services'
import { generateVerificationCode } from '@/utils'
import { EmailVerification } from '@prisma/client'
import { EmailsVerificationRepository } from '@/repositories'
interface SendVerificationCodeRequest {
  email: string
}

interface SendVerificationCodeResponse {
  email: EmailVerification
}

export class SendVerificationCodeUseCase {
  constructor(
    private emailVerificationRepository: EmailsVerificationRepository,
  ) {}

  async execute({
    email,
  }: SendVerificationCodeRequest): Promise<SendVerificationCodeResponse> {
    const code = generateVerificationCode()

    let emailVerification

    const existingVerification =
      await this.emailVerificationRepository.findByEmail(email)
    if (existingVerification) {
      emailVerification = await this.emailVerificationRepository.updateCode(
        email,
        code,
      )
    } else {
      emailVerification = await this.emailVerificationRepository.create(
        email,
        code,
      )
    }

    await sendEmail({
      to: email,
      from: env.USER_EMAIL,
      subject: 'Muve - Código de Verificação',
      text: `Seu código de verificação é: ${code}`,
      html: `<p>Seu código de verificação é: <strong>${code}</strong></p>`,
    })

    return {
      email: emailVerification,
    }
  }
}
