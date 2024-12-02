import { stripe } from '@/lib'
import { sendEmail } from '@/services'
import { Signature } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { InvoicePaymentFailedEmail } from '@/templates'
import { formatTimestamp, planNameMappingStripe } from '@/utils'
import { UsersRepository, SignaturesRepository } from '@/repositories'

interface InvoicePaymentFailedRequest {
  invoiceId: string
  subscriptionId: string
}

interface InvoicePaymentFailedResponse {
  updatedSignature: Signature
}

export class InvoicePaymentFailedUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    invoiceId,
    subscriptionId,
  }: InvoicePaymentFailedRequest): Promise<InvoicePaymentFailedResponse> {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const lastSignature =
      await this.signatureRepository.findLastByStripeSubscriptionId(
        subscriptionId,
      )

    if (!lastSignature) {
      throw new NotFoundErros('Last Signature')
    }

    const updatedSignature = await this.signatureRepository.update(
      lastSignature.id,
      {
        status: subscription.status,
        end_date: formatTimestamp(subscription.current_period_end),
        payment_method: String(subscription.default_payment_method),
        start_date: formatTimestamp(subscription.current_period_start),
        next_charge_date: formatTimestamp(subscription.current_period_end),
      },
    )

    const user = await this.usersRepository.findById(lastSignature.userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const plan = planNameMappingStripe(updatedSignature.plan)

    const invoicePaymentFailed = InvoicePaymentFailedEmail({
      plan,
      name: user.name,
      price: (Number(updatedSignature.price) / 100).toFixed(2),
    })

    await sendEmail({
      to: user.email,
      html: invoicePaymentFailed,
      from: 'contato@muveplayer.com',
      subject: 'Atenção: Houve um problema com o pagamento da sua assinatura',
    })

    return { updatedSignature }
  }
}
