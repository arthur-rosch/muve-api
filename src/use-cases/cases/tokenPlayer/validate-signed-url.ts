import { env } from '../../../env'
import { verify, JsonWebTokenError } from 'jsonwebtoken'
import { TokenPlayerRepository } from '../../../repositories'

export class ValidateSignedUrlUseCase {
  constructor(private tokenRepository: TokenPlayerRepository) {}

  async execute(videoPlayerId: string, token: string): Promise<boolean> {
    const isValid = await this.tokenRepository.isTokenValid(token)

    if (!isValid) {
      return false
    }

    try {
      const secretKey = env.JWT_SECRET as string
      const decoded = verify(token, secretKey) as {
        videoPlayerId: string
        exp: number
      }

      return (
        decoded.videoPlayerId === videoPlayerId &&
        decoded.exp > Math.floor(Date.now() / 1000)
      )
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return false
      }
      throw error
    }
  }
}
