import { NotFoundErros } from '@/use-cases/erros';
import { ValidationPhoneRepository } from '@/repositories/validation-phone-repository';
import { UsersRepository } from '@/repositories';

interface ValidatePhoneAuthUseCaseRequest {
  telephone: string;
  authCode: string;
  userId: string;
}

interface ValidatePhoneAuthUseCaseResponse {
  valid: boolean;
}

export class ValidatePhoneAuthUseCase {
  constructor(private usersRepository: UsersRepository, private phoneAuthRepository: ValidationPhoneRepository) {}

  async execute({
    telephone,
    authCode,
    userId,
  }: ValidatePhoneAuthUseCaseRequest): Promise<ValidatePhoneAuthUseCaseResponse> {
    const phoneAuth = await this.phoneAuthRepository.findByPhoneNumberValidation(telephone);

    if (!phoneAuth) {
      throw new NotFoundErros('Não há código gerado para esse número');
    }

    const currentTime = new Date();
    if (currentTime > phoneAuth.expiresAt) {
      throw new NotFoundErros('O código está expirado');
    }

    if (phoneAuth.code !== authCode) {
      return {
        valid: false,
      };
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundErros('User');
    }

    await this.usersRepository.update(userId, {
      isPhoneVerified: true,
    });

    return {
      valid: true,
    };
  }
}
