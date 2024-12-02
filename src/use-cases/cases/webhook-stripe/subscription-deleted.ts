import { stripe } from '@/lib'
import { sendEmail } from '@/services'
import { Signature } from '@prisma/client'
import { UnsubscribeEmail } from '@/templates'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories'

interface SubscriptionDeletedRequest {
  subscriptionId: string
}

interface SubscriptionDeletedResponse {
  updatedSignature: Signature
}

export class SubscriptionDeletedUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    subscriptionId,
  }: SubscriptionDeletedRequest): Promise<SubscriptionDeletedResponse> {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const lastSignature =
      await this.signatureRepository.findLastByStripeSubscriptionId(
        subscriptionId,
      )

    if (!lastSignature) {
      throw new NotFoundErros('Last Signature')
    }

    const updatedSignature =
      await this.signatureRepository.updateStatusSignature(
        lastSignature.id,
        subscription.status,
      )

    const user = await this.usersRepository.findById(lastSignature.userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const cancellationEmail = UnsubscribeEmail({
      name: user.name,
    })

    await sendEmail({
      to: user.email,
      html: cancellationEmail,
      from: 'contato@muveplayer.com',
      subject: 'Assinatura Cancelada - Muve Player',
    })

    return { updatedSignature }
  }
}
