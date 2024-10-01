export interface ValidationPhoneRepository {
    createCode(token: string, videoPlayerId: string): Promise<void>
    isTokenValid(token: string): Promise<boolean>
    invalidateToken(token: string): Promise<void>
  }
  