import { User } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository } from '@/repositories/user-repository'

interface RecoverPasswordUseCaseRequest {
  email: string
}

interface RecoverPasswordUseCaseResponse {
  user: User
}

export class RecoverPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: RecoverPasswordUseCaseRequest): Promise<RecoverPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const updatedUser = await this.usersRepository.update(userId, {
      document,
      name,
      phone,
    })

    return {
      user: updatedUser,
    }
  }
}
