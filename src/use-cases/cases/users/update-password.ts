import { compare, hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/user-repository'
import { InvalidCredentialsError, NotFoundErros } from '@/use-cases/erros'

interface UpdatePasswordUseCaseRequest {
  userId: string
  newPassword: string
  password: string
}

interface UpdatePasswordUseCaseResponse {
  user: User
}

export class UpdatePasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    password,
    newPassword,
  }: UpdatePasswordUseCaseRequest): Promise<UpdatePasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const doestPasswordMatches = await compare(password, user.password_hash)

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const newPasswordHashed = await hash(newPassword, 6)

    const newUser = await this.usersRepository.update(user.id, {
      ...user,
      password_hash: newPasswordHashed,
    })

    return {
      user: newUser,
    }
  }
}
