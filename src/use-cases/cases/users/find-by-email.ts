import { User } from '@prisma/client'
import { UserAlreadyExistsError } from '@/use-cases/erros'
import { UsersRepository } from '@/repositories/user-repository'

interface FindByEmailUseCaseRequest {
  email: string
}

interface FindByEmailUseCaseResponse {
  user: User
}

export class FindByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: FindByEmailUseCaseRequest): Promise<FindByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    return {
      user,
    }
  }
}
