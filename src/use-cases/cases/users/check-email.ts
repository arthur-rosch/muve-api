import { User } from '@prisma/client'
import { UserAlreadyExistsError } from '../../../use-cases/erros'
import { UsersRepository } from '../../../repositories/user-repository'

interface CheckEmailUseCaseRequest {
  email: string
}

interface CheckEmailUseCaseResponse {
  user: User
}

export class CheckEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: CheckEmailUseCaseRequest): Promise<CheckEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExistsError()
    }

    return {
      user,
    }
  }
}
