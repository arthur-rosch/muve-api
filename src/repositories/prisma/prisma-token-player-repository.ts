import { prisma } from '../../lib/prisma'
import { TokenPlayerRepository } from '../token-player-repository'

export class PrismaTokenPlayerRepository implements TokenPlayerRepository {
  async createToken(token: string, videoPlayerId: string): Promise<void> {
    await prisma.token.create({
      data: {
        token,
        videoPlayerId,
        isValid: true,
      },
    })
  }

  async invalidateToken(token: string): Promise<void> {
    await prisma.token.updateMany({
      where: { token },
      data: { isValid: false },
    })
  }

  async isTokenValid(token: string): Promise<boolean> {
    const tokenRecord = await prisma.token.findUnique({
      where: { token },
    })
    return !!tokenRecord && tokenRecord.isValid
  }
}
