import { User } from '@prisma/client'
import { NotFoundErros } from '../../../use-cases/erros'
import { UsersRepository } from '../../../repositories/user-repository'

interface CheckJwtUseCaseRequest {
  userId: string
}

interface CheckJwtUseCaseResponse {
  user: User
}

export class CheckJwtUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: CheckJwtUseCaseRequest): Promise<CheckJwtUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    return {
      user,
    }
  }
}
