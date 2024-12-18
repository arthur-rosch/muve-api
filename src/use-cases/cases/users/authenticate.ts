import { compare } from 'bcryptjs';
import { Signature, User } from '@prisma/client';
import {
  UsersRepository,
  SignaturesRepository,
  EmailsVerificationRepository,
} from '../../../repositories';
import {
  NotFoundErros,
  LateSubscriptionError,
  InvalidCredentialsError,
  SubscriptionPausedError,
  SubscriptionCancelledError,
  EmailVerificationNotFoundError,
} from '../../../use-cases/erros';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
  signature?: Signature;
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signaturesRepository: SignaturesRepository,
    private emailVerificationRepository: EmailsVerificationRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundErros('User');
    }

    const doestPasswordMatches = await compare(password, user.password_hash);
    console.log(doestPasswordMatches);
    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }
    const signature = await this.signaturesRepository.checkStatusSignature(
      user.id,
    );

    if (!signature) {
      throw new NotFoundErros('Subscription');
    }

    if (signature.status === 'canceled') {
      throw new SubscriptionCancelledError();
    }

    if (signature.status === 'pending') {
      throw new LateSubscriptionError();
    }

    const emailVerification =
      await this.emailVerificationRepository.findByEmail(user.email);

    if (!emailVerification) {
      throw new EmailVerificationNotFoundError();
    }

    if (!emailVerification.isVerified) {
      throw new EmailVerificationNotFoundError();
    }

    return {
      user,
      signature,
    };
  }
}
