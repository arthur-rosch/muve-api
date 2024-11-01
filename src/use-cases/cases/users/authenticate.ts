import { compare } from 'bcryptjs'
import { Signature, User } from '@prisma/client'
import {
  InvalidCredentialsError,
  SubscriptionCancelledError,
  LateSubscriptionError,
  SubscriptionPausedError,
  NotFoundErros,
} from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
  signature?: Signature
}

export class AuthenticateUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signaturesRepository: SignaturesRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    const signature = await this.signaturesRepository.checkStatusSignature(
      user.id,
    )

    if (!signature) {
      throw new NotFoundErros('Subscription')
    }

    // Verifica se a assinatura foi cancelada
    if (signature.status === 'CANCELED') {
      throw new SubscriptionCancelledError()
    }

    // Verifica se a assinatura está pendente
    if (signature.status === 'PENDING') {
      throw new LateSubscriptionError()
    }

    // // Verifica se a data de cobrança já passou e pausa a assinatura, se necessário
    // const currentDate = new Date()
    // const nextChargeDate = new Date(signature.next_charge_date)

    // if (currentDate > nextChargeDate) {
    //   await this.signaturesRepository.updateStatusSignature(user.id, 'PAUSED')

    //   throw new SubscriptionPausedError()
    // }

    return {
      user,
      signature,
    }
  }
}
