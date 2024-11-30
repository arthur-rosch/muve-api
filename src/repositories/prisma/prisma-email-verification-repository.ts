import { PrismaClient, EmailVerification } from '@prisma/client'
import { EmailsVerificationRepository } from '../email-verification-repository'

const prisma = new PrismaClient()

export class PrismaEmailVerificationRepository
  implements EmailsVerificationRepository
{
  async create(email: string, code: string): Promise<EmailVerification> {
    return prisma.emailVerification.create({
      data: { email, code },
    })
  }

  async findByEmail(email: string): Promise<EmailVerification | null> {
    return prisma.emailVerification.findUnique({
      where: { email },
    })
  }

  async findById(id: string): Promise<EmailVerification | null> {
    return prisma.emailVerification.findUnique({
      where: { id },
    })
  }

  async findByCode(code: string): Promise<EmailVerification | null> {
    return prisma.emailVerification.findFirst({
      where: { code },
    })
  }

  async updateVerificationStatus(email: string): Promise<EmailVerification> {
    return prisma.emailVerification.update({
      where: { email },
      data: { isVerified: true },
    })
  }

  async updateCode(email: string, code: string): Promise<EmailVerification> {
    return prisma.emailVerification.update({
      where: { email },
      data: { code },
    })
  }
}
