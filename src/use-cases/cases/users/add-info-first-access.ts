import { User } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository } from '@/repositories'

interface AddInfoFirstAccessUseCaseRequest {
  userId: string
  accountType: string
  memberArea: string
  videoHosting: string
}

interface AddInfoFirstAccessUseCaseResponse {
  user: User
}

export class AddInfoFirstAccessUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    accountType,
    memberArea,
    videoHosting,
  }: AddInfoFirstAccessUseCaseRequest): Promise<AddInfoFirstAccessUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const newUser = await this.usersRepository.update(user.id, {
      ...user,
      accountType,
      memberArea,
      videoHosting,
    })

    return {
      user: newUser,
    }
  }
}
