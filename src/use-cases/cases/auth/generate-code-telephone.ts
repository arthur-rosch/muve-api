import { PhoneAuth } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository } from '@/repositories'
import { ValidationPhoneRepository } from '@/repositories/validation-phone-repository'
import { sendAuthCode } from '@/services/send-autentications'

interface CreatePhoneAuthUseCaseRequest {
  userId: string
  phoneNumber: string
}

interface CreatePhoneAuthUseCaseResponse {
  phoneAuth: PhoneAuth
}

export class CreatePhoneAuthUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private phoneAuthRepository: ValidationPhoneRepository,
  ) {}

  async execute({
    userId,
    phoneNumber,
  }: CreatePhoneAuthUseCaseRequest): Promise<CreatePhoneAuthUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const authCode = this.generateAuthCode()

    const phoneAuth = await this.phoneAuthRepository.create({
      user: { connect: { id: userId } },
      telephone: phoneNumber,
      code: authCode,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), 
    })  

    /*
    await sendAuthCode({
      to: phoneNumber,
      authCode,
    })
    */  
   
    return {
      phoneAuth
    }
  }

  private generateAuthCode(): string {
    const digits = '0123456789'
    let authCode = ''
    for (let i = 0; i < 6; i++) {
      authCode += digits[Math.floor(Math.random() * 10)]
    }
    return authCode
  }
}
