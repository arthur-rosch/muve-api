import { hash } from 'bcryptjs'
import { planMapping } from '@/utils'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories'
import {
  Plan,
  User,
  Signature,
  ChargeFrequency,
  StatusSignature,
} from '@prisma/client'
import { PurchaseEmail } from '@/templates'
import { sendEmail } from '@/services/send-email'

interface PurchaseApprovedUseCaseRequest {
  status: string

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
    status,
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
    const sendEmailPurchased = async () => {
      const purchaseEmail = PurchaseEmail({
        name,
        password,
        login: email,
      })
      await sendEmail({
        from: 'contato@muveplayer.com', // O remetente
        to: email, // O destinatário
        subject: 'Compra aprovado Muve Player', // Assunto do email
        html: purchaseEmail,
      })
    }

    const password_hash = await hash(password, 6)

    const userExist = await this.usersRepository.findByEmail(email)

    if (userExist) {
      const lastSignature = await this.signaturesRepository.findByUserId(
        userExist.id,
      )

      if (!lastSignature) {
        throw new NotFoundErros('Signature')
      }

      await this.signaturesRepository.updateStatusSignature(
        lastSignature.id,
        'CANCELED',
      )

      const signaturePlan: Plan = planMapping(plan)

      const signature = await this.signaturesRepository.create({
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
            id: userExist.id,
          },
        },
      })
      userExist.password_hash = ''

      sendEmailPurchased()

      return {
        user: userExist,
        signature,
      }
    } else {
      const user = await this.usersRepository.create({
        name,
        email,
        phone,
        document,
        password_hash,
      })

      const signaturePlan: Plan = planMapping(plan)

      const signature = await this.signaturesRepository.create({
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

      user.password_hash = ''

      sendEmailPurchased()

      return {
        user,
        signature,
      }
    }
  }
}
