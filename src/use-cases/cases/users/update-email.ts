import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError } from '@/use-cases/erros'

interface UpdateEmailUseCaseRequest {
  email: string
  newEmail: string
  password: string
}

interface UpdateEmailUseCaseResponse {
  user: User
}

export class UpdateEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    newEmail,
    password,
  }: UpdateEmailUseCaseRequest): Promise<UpdateEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const userNewEmail = await this.usersRepository.findByEmail(newEmail)

    if (userNewEmail) {
      throw new InvalidCredentialsError()
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const newUser = await this.usersRepository.update(user.id, {
      ...user,
      email: newEmail,
    })

    return {
      user: newUser,
    }
  }
}
