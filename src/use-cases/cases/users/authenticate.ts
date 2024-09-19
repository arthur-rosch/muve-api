import { compare } from 'bcryptjs'
import { Signature, User } from '@prisma/client'
import { InvalidCredentialsError } from '@/use-cases/erros'
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

    if (signature) {
      return {
        user,
        signature,
      }
    }

    return {
      user,
    }
  }
}
