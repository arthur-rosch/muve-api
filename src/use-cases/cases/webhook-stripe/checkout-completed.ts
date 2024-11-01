import { stripe } from '@/lib'
import { hash } from 'bcryptjs'
import { NotFoundErros } from '@/use-cases/erros'
import { formatTimestamp, planMappingStripe } from '@/utils'
import { Signature, StatusSignature, User } from '@prisma/client'
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
  emailSend: boolean
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

    const password_hash = await hash(lead.document, 6)

    const user = await this.userRepository.create({
      password_hash,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      document: lead.document,
      stripeCustomersId: customerId,
    })

    await this.leadsRepository.delete(lead.id)

    const stripeSignature = await stripe.subscriptions.retrieve(subscriptionId)

    const signature = await this.signatureRepository.create({
      stripe_subscription_id: stripeSignature.id,
      stripe_customer_id: String(stripeSignature.customer),
      user: { connect: { id: user.id } },
      status: stripeSignature.status as StatusSignature,
      ChargeFrequency: 'MONTHLY',
      price: String(stripeSignature.items.data[0].price.unit_amount),
      payment_method: String(stripeSignature.default_payment_method),
      start_date: formatTimestamp(stripeSignature.current_period_start),
      end_date: formatTimestamp(stripeSignature.current_period_end),
      trial_end_date: formatTimestamp(stripeSignature.trial_end),
      next_charge_date: formatTimestamp(stripeSignature.current_period_end),
      plan: planMappingStripe(
        String(stripeSignature.items.data[0].plan.product),
      ),
    })

    await this.leadsRepository.delete(lead.id)

    return { emailSend: true, signature, user }
  }
}
