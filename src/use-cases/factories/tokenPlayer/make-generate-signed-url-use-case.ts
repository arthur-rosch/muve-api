import { PrismaTokenPlayerRepository } from '@/repositories/prisma'
import { GenerateSignedUrlUseCase } from '../../cases/tokenPlayer/generate-signed-url'

export function makeGenerateSignedUrlUseCase() {
  const tokenPlayerRepository = new PrismaTokenPlayerRepository()

  const generateSignedUrlUseCase = new GenerateSignedUrlUseCase(
    tokenPlayerRepository,
  )

  return generateSignedUrlUseCase
}
