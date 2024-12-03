import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '../../../repositories/user-repository'
import { NotFoundErros } from '../../../use-cases/erros'

interface ForgotPasswordUseCaseRequest {
  userId: string
  newPassword: string
  confirmNewPassword: string
}

interface ForgotPasswordUseCaseResponse {
  user: User
}

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    newPassword,
    confirmNewPassword,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
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
