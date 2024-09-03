import { hash } from 'bcryptjs'
import { planMapping } from '@/utils'
import { UserAlreadyExistsError } from '@/use-cases/erros'
import { Plan, Signature, ChargeFrequency, User } from '@prisma/client'
import { UsersRepository, SignaturesRepository } from '@/repositories'

interface PurchaseApprovedUseCaseRequest {
  name: string
  phone: string
  email: string
  document: string
  password: string

  plan: string
  price: string
  payment_method: string
  chargeFrequency: string
  next_charge_date: string

  kirvano_type: string
  kirvano_sale_id: string
  kirvano_checkout_id: string
}

interface PurchaseApprovedUseCaseResponse {
  user: User
  signature: Signature
}

export class PurchaseApprovedUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signaturesRepository: SignaturesRepository,
  ) {}

  async execute({
    name,
    email,
    phone,
    document,
    password,

    plan,
    price,
    payment_method,

    chargeFrequency,
    next_charge_date,

    kirvano_type,
    kirvano_sale_id,
    kirvano_checkout_id,
  }: PurchaseApprovedUseCaseRequest): Promise<PurchaseApprovedUseCaseResponse> {
    const password_hash = await hash(password, 6)

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

    const signaturePlan: Plan = planMapping[plan]

    console.log(signaturePlan)

    const signature = await this.signaturesRepository.create({
      price,
      payment_method,
      status: 'ACTIVE',
      plan: signaturePlan,

      kirvano_type,
      kirvano_sale_id,
      kirvano_checkout_id,

      next_charge_date,
      ChargeFrequency: chargeFrequency as ChargeFrequency,

      user: {
        connect: {
          id: user.id,
        },
      },
    })

    user.password_hash = ''

    return {
      user,
      signature,
    }
  }
}
