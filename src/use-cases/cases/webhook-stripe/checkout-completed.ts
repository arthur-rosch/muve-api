import { hash } from 'bcryptjs'
import { sendEmail } from '@/services'
import { PurchaseEmail } from '@/templates'
import { NotFoundErros } from '@/use-cases/erros'
import { User } from '@prisma/client'
import {
  LeadsRepository,
  UsersRepository,
  SignaturesRepository,
} from '@/repositories'

interface CheckoutCompletedUseCaseRequest {
  leadId: string
  customerId: string
  subscriptionId: string
}

interface CheckoutCompletedUseCaseResponse {
  user: User
}

export class CheckoutCompletedUseCase {
  constructor(
    private leadsRepository: LeadsRepository,
    private userRepository: UsersRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    leadId,
    customerId,
    subscriptionId,
  }: CheckoutCompletedUseCaseRequest): Promise<CheckoutCompletedUseCaseResponse> {
    const lead = await this.leadsRepository.findById(leadId)

    if (!lead) {
      throw new NotFoundErros('Lead')
    }

    let user
    const userExist = await this.userRepository.findByEmail(lead.email)

    if (userExist) {
      user = await this.userRepository.update(user.id, {
        stripeCustomersId: customerId,
      })
    } else {
      const password_hash = await hash(lead.document, 6)

      user = await this.userRepository.create({
        password_hash,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        document: lead.document,
        stripeCustomersId: customerId,
      })
    }

    await this.leadsRepository.delete(lead.id)

    const purchaseEmail = PurchaseEmail({
      name: user.name,
      password: user.document,
      login: user.email,
    })

    await sendEmail({
      to: user.email,
      html: purchaseEmail,
      from: 'contato@muveplayer.com',
      subject: 'Compra aprovada Muve Player',
    })

    return { user }
  }
}
