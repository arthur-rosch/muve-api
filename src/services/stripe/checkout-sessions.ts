import { stripe } from '@/lib'

interface CreateStripeCheckoutProps {
  email: string
  leadId: string
  priceId: string
  success_url: string
}

export const createStripeCheckout = async ({
  email,
  leadId,
  priceId,
  success_url,
}: CreateStripeCheckoutProps) => {
  const checkout = await stripe.checkout.sessions.create({
    success_url,
    line_items: [
      {
        quantity: 1,
        price: priceId,
      },
    ],
    customer_email: email,
    client_reference_id: leadId,
    payment_method_types: ['card'],
    phone_number_collection: {
      enabled: true,
    },
    mode: 'subscription',
    subscription_data: {
      trial_period_days: 7,
    },
  })

  return checkout
}
