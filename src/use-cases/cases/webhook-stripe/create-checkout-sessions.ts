import { stripe } from '../../../lib'
import { planMappingStripe } from '../../../utils'
import { UsersRepository } from '../../../repositories'
import { NotFoundErros } from '@/use-cases/erros'

interface CreateStripeCheckoutProps {
  email: string
  plan: string
}
interface CreateStripeCheckoutResponse {
  checkoutUrl: string
}

export class CreateStripeCheckoutUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    plan,
  }: CreateStripeCheckoutProps): Promise<CreateStripeCheckoutResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const priceId = planMappingStripe(plan)

    const { url } = await stripe.checkout.sessions.create({
      success_url: 'https://web.muveplayer.com/thanks',
      line_items: [
        {
          quantity: 1,
          price: priceId,
        },
      ],
      customer: user.stripeCustomersId,
      client_reference_id: user.id,
      payment_method_types: ['card'],
      phone_number_collection: {
        enabled: true,
      },
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7,
      },
    })

    return {
      checkoutUrl: url,
    }
  }
}
