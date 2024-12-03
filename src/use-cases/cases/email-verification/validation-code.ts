import { EmailsVerificationRepository } from '../../../repositories'
import { InvalidVerificationCodeError } from '../../../use-cases/erros'

interface ValidationCodeCodeRequest {
  email: string
  code: string
}

interface ValidationCodeCodeResponse {
  status: boolean
}

export class ValidationCodeCodeUseCase {
  constructor(
    private emailVerificationRepository: EmailsVerificationRepository,
  ) {}

  async execute({
    email,
    code,
  }: ValidationCodeCodeRequest): Promise<ValidationCodeCodeResponse> {
    const verification = await this.emailVerificationRepository.findByEmail(
      email,
    )

    if (!verification || verification.code !== code) {
      throw new InvalidVerificationCodeError()
    }

    const { isVerified } =
      await this.emailVerificationRepository.updateVerificationStatus(email)

    return {
      status: isVerified,
    }
  }
}
