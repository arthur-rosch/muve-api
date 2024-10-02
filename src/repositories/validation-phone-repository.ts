import { Prisma, PhoneAuth } from "@prisma/client"

export interface ValidationPhoneRepository {
    createCode(token: string, videoPlayerId: string): Promise<void>
    isTokenValid(token: string): Promise<boolean>
    invalidateToken(token: string): Promise<void>

    findByPhoneNumberValidation(phoneNumber: string): Promise<PhoneAuth| null>
    create(data: Prisma.PhoneAuthCreateInput): Promise<PhoneAuth>
  }
  