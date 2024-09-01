import { PrismaTokenPlayerRepository } from '@/repositories/prisma'
import { InvalidateTokenUseCase } from '../../cases/tokenPlayer/invalidate-token'

export function makeInvalidateTokenUseCase() {
  const tokenPlayerRepository = new PrismaTokenPlayerRepository()

  const invalidateTokenUseCase = new InvalidateTokenUseCase(
    tokenPlayerRepository,
  )

  return invalidateTokenUseCase
}
