import { TokenPlayerRepository } from '../../../repositories'

export class InvalidateTokenUseCase {
  constructor(private tokenRepository: TokenPlayerRepository) {}

  async execute(token: string): Promise<void> {
    await this.tokenRepository.invalidateToken(token)
  }
}
