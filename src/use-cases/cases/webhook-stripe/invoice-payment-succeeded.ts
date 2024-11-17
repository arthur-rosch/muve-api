import { stripe } from '@/lib'
import { sendEmail } from '@/services'
import { Signature } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { InvoicePaymentSucceededEmail } from '@/templates'
import { formatTimestamp, planNameMappingStripe } from '@/utils'
import { UsersRepository, SignaturesRepository } from '@/repositories'

interface InvoicePaymentSucceededRequest {
  subscriptionId: string
  customerId: string
  invoiceId: string
}

interface InvoicePaymentSucceededResponse {
  newSignature: Signature
}

export class InvoicePaymentSucceededUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    subscriptionId,
    customerId,
    invoiceId,
  }: InvoicePaymentSucceededRequest): Promise<InvoicePaymentSucceededResponse> {
    const invoice = await stripe.invoices.retrieve(invoiceId)
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const user = await this.usersRepository.findByCustomerId(
      String(subscription.customer),
    )

    if (!user) {
      throw new NotFoundErros('User')
    }

    const lastSignature =
      await this.signatureRepository.findLastByStripeSubscriptionId(
        subscriptionId,
      )

    if (lastSignature) {
      await this.signatureRepository.updateStatusSignature(
        lastSignature.id,
        subscription.status,
      )
    }

    const newSignature = await this.signatureRepository.create({
      plan: String(invoice.lines.data[0].plan.id),
      ChargeFrequency: 'MONTHLY',
      status: subscription.status,
      stripe_customer_id: customerId,
      price: String(invoice.amount_paid),
      stripe_subscription_id: subscriptionId,
      user: { connect: { id: user.id } },
      trial_end_date: formatTimestamp(subscription.trial_end),
      end_date: formatTimestamp(subscription.current_period_end),
      payment_method: String(subscription.default_payment_method),
      start_date: formatTimestamp(subscription.current_period_start),
      next_charge_date: formatTimestamp(subscription.current_period_end),
    })

    const plan = planNameMappingStripe(newSignature.plan)

    const invoicePaymentSucceeded = InvoicePaymentSucceededEmail({
      plan,
      name: user.name,
      price: (Number(newSignature.price) / 100).toFixed(2),
    })

    const subject = lastSignature
      ? 'Assinatura muve renovada!'
      : 'Assinatura muve paga com sucesso!'

    await sendEmail({
      to: user.email,
      html: invoicePaymentSucceeded,
      from: 'contato@muveplayer.com',
      subject,
    })

    return { newSignature }
  }
}
