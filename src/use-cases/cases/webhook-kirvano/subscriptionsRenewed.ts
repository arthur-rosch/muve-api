import { planMapping } from '@/utils'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories'
import {
  Plan,
  Signature,
  ChargeFrequency,
  StatusSignature,
} from '@prisma/client'

interface SubscriptionsRenewedUseCaseRequest {
  status: string
  email: string

  plan: string
  price: string
  payment_method: string
  chargeFrequency: string
  next_charge_date: string

  kirvano_type: string
  kirvano_sale_id: string
  kirvano_checkout_id: string
}

interface SubscriptionsRenewedUseCaseResponse {
  subscriptionsRenewed: Signature
}

export class SubscriptionsRenewedUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signaturesRepository: SignaturesRepository,
  ) {}

  async execute({
    status,
    email,

    plan,
    price,
    payment_method,

    chargeFrequency,
    next_charge_date,

    kirvano_type,
    kirvano_sale_id,
    kirvano_checkout_id,
  }: SubscriptionsRenewedUseCaseRequest): Promise<SubscriptionsRenewedUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const lastSignature = await this.signaturesRepository.findByUserId(user.id)

    if (!lastSignature) {
      throw new NotFoundErros('Signature')
    }

    await this.signaturesRepository.updateStatusSignature(
      lastSignature.id,
      'CANCELED',
    )

    const signaturePlan: Plan = planMapping[plan]

    const subscriptionsRenewed = await this.signaturesRepository.create({
      price,
      payment_method,
      plan: signaturePlan,
      status: status as StatusSignature,

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

    return {
      subscriptionsRenewed,
    }
  }
}
