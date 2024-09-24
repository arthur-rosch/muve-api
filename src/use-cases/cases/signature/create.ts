import {
  Plan,
  Signature,
  ChargeFrequency,
  StatusSignature,
} from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories'
import { planMapping } from '@/utils'

interface CreateSignatureUseCaseRequest {
  plan: string
  price: string
  userId: string
  payment_method: string
  chargeFrequency: string
  next_charge_date: string

  kirvano_type: string
  kirvano_sale_id: string
  kirvano_checkout_id: string
}

interface CreateSignatureUseCaseResponse {
  signature: Signature
}

export class CreateSignatureUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signaturesRepository: SignaturesRepository,
  ) {}

  async execute({
    userId,

    plan,
    price,
    payment_method,

    chargeFrequency,
    next_charge_date,

    kirvano_type,
    kirvano_sale_id,
    kirvano_checkout_id,
  }: CreateSignatureUseCaseRequest): Promise<CreateSignatureUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const signaturePlan: Plan = planMapping(plan)

    const signature = await this.signaturesRepository.create({
      price,
      payment_method,
      status: 'ACTIVE' as StatusSignature,
      plan: signaturePlan,

      kirvano_type,
      kirvano_sale_id,
      kirvano_checkout_id,

      next_charge_date,
      ChargeFrequency: chargeFrequency as ChargeFrequency,

      user: {
        connect: {
          id: userId,
        },
      },
    })

    return {
      signature,
    }
  }
}
