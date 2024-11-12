import { stripe } from '@/lib'
import { hash } from 'bcryptjs'
import { sendEmail } from '@/services'
import { PurchaseEmail } from '@/templates'
import { NotFoundErros } from '@/use-cases/erros'
import { Signature, User } from '@prisma/client'
import { formatTimestamp, planMappingStripe } from '@/utils'
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
  signature: Signature
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

    const stripeSignature = await stripe.subscriptions.retrieve(subscriptionId)

    const signature = await this.signatureRepository.create({
      ChargeFrequency: 'MONTHLY',
      status: stripeSignature.status,
      user: { connect: { id: user.id } },
      stripe_subscription_id: stripeSignature.id,
      stripe_customer_id: String(stripeSignature.customer),
      trial_end_date: formatTimestamp(stripeSignature.trial_end),
      price: String(stripeSignature.items.data[0].price.unit_amount),
      payment_method: String(stripeSignature.default_payment_method),
      start_date: formatTimestamp(stripeSignature.current_period_start),
      end_date: formatTimestamp(stripeSignature.current_period_end),
      next_charge_date: formatTimestamp(stripeSignature.current_period_end),
      plan: planMappingStripe(
        String(stripeSignature.items.data[0].plan.product),
      ),
    })

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

    return { signature, user }
  }
}
