import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
// import { sendEmail } from '@/services'
import { mixpanel } from '@/lib/mixpanel'
import { UserAlreadyExistsError } from '@/use-cases/erros'
import { UsersRepository } from '@/repositories/user-repository'

interface RegisterUserCaseRequest {
  name: string
  phone: string
  email: string
  document?: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    phone,
    document,
    password,
  }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      document: '0990',
      password_hash,
    })

    mixpanel.track('Lead', {
      distinct_id: user.id,
      'Lead Type': 'Referral',
    })

    // await sendEmail({
    //   from: 'noreply@example.com',
    //   to: email,
    //   subject: 'Welcome to Our Application',
    //   text: `Welcome ${name}!`,
    //   html: `
    //     <h1>Welcome to Our Application</h1>
    //     <p>Thank you for registering!</p>
    //     <p>${email}</p>
    //     <p>${password}</p>
    //   `,
    // })

    return { user }
  }
}
