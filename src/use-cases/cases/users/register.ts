import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories/'
import { stripe } from '@/lib'

interface RegisterUserCaseRequest {
  name: string
  phone: string
  email: string
  password: string
  document: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    name,
    email,
    phone,
    password,
    document,
  }: RegisterUserCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const customer = await stripe.customers.create({
      email,
      phone,
      name,
    })

    const user = await this.usersRepository.create({
      name,
      email,
      phone,
      document,
      password_hash,
      stripeCustomersId: customer.id,
    })

    await this.signatureRepository.create({
      price: '0',
      plan: 'free',
      status: 'free',
      end_date: null,
      trial_end_date: null,
      ChargeFrequency: 'MONTHLY',
      stripe_subscription_id: 'N/A',
      stripe_customer_id: customer.id,
      user: { connect: { id: user.id } },
      payment_method: 'N/A',
      start_date: new Date(),
      next_charge_date: 'N/A',
    })

    return { user }
  }
}
