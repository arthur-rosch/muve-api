import { User } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository } from '@/repositories/user-repository'

interface UpdateProfileUseCaseRequest {
  userId: string
  name: string
  phone: string
  document: string
}

interface UpdateProfileUseCaseResponse {
  user: User
}

export class UpdateProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    document,
    name,
    phone,
    userId,
  }: UpdateProfileUseCaseRequest): Promise<UpdateProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

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
