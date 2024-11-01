import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from '@/use-cases/erros'
import { UsersRepository } from '@/repositories/user-repository'

interface RegisterUserCaseRequest {
  plan: string
  name: string
  phone: string
  email: string
  document: string
}

interface RegisterUseCaseResponse {
  user: User
  checkoutUrl: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    plan,
    name,
    email,
    phone,
    document,
  }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(document, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      document,
      password_hash,
    })

    return { user, checkoutUrl: '' }
  }
}
