export interface TokenPlayerRepository {
  createToken(token: string, videoPlayerId: string): Promise<void>
  isTokenValid(token: string): Promise<boolean>
  invalidateToken(token: string): Promise<void>
}
