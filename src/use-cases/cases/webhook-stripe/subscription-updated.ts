import { stripe } from '@/lib'
import { formatTimestamp } from '@/utils'
import { Signature } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories'

interface SubscriptionUpdatedRequest {
  subscriptionId: string
}

interface SubscriptionUpdatedResponse {
  updatedSignature: Signature
}

export class SubscriptionUpdatedUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    subscriptionId,
  }: SubscriptionUpdatedRequest): Promise<SubscriptionUpdatedResponse> {
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
        plan: subscription.items.data[0].price.id,
        end_date: new Date(subscription.current_period_end * 1000),
        start_date: new Date(subscription.current_period_start * 1000),
        next_charge_date: formatTimestamp(subscription.current_period_end),
      },
    )

    return { updatedSignature }
  }
}
