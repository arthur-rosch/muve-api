import { EmailVerification } from '@prisma/client'

export interface EmailsVerificationRepository {
  findById(id: string): Promise<EmailVerification | null>
  findByEmail(email: string): Promise<EmailVerification | null>
  findByCode(code: string): Promise<EmailVerification | null>

  create(email: string, code: string): Promise<EmailVerification>
  updateCode(email: string, code: string): Promise<EmailVerification>
  updateVerificationStatus(email: string): Promise<EmailVerification>
}
