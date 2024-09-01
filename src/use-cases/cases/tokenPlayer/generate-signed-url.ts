import { env } from '@/env'
import { sign } from 'jsonwebtoken'
import { TokenPlayerRepository } from '../../../repositories'

export class GenerateSignedUrlUseCase {
  constructor(private tokenRepository: TokenPlayerRepository) {}

  async execute(videoPlayerId: string): Promise<string> {
    const payload = {
      videoPlayerId,
      exp: Math.floor(Date.now() / 1000) + 300,
    }

    const secretKey = env.JWT_SECRET as string
    const token = sign(payload, secretKey)

    await this.tokenRepository.createToken(token, videoPlayerId)

    const baseUrl = `https://seu-dominio.com/demo/player?videoPlayerId=${videoPlayerId}`
    const signedUrl = `${baseUrl}&token=${token}`

    return signedUrl
  }
}
