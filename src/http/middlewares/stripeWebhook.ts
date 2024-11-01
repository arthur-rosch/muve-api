import stripe from 'stripe'
import { FastifyRequest, FastifyReply } from 'fastify'
import { checkoutExpired } from '../controllers/webhook-stripe/checkout-expired'
import { checkoutCompleted } from '../controllers/webhook-stripe/checkout-completed'

const endpointSecret = 'whsec_6DfU9pNJ4RPDpflqwF1p2osQN26i5TTm'

export async function handleStripeWebhook(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sig = request.headers['stripe-signature'] as string
  let event

  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret)
    console.log(event)
  } catch (err) {
    console.error(`⚠️  Webhook signature verification failed: ${err.message}`)
    return reply.status(400).send(`Webhook Error: ${err.message}`)
  }

  switch (event.type) {
    case 'checkout.session.expired':
      await checkoutExpired(request, reply, event.data.object)
      break
    case 'checkout.session.completed':
      await checkoutCompleted(request, reply, event.data.object)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
      reply.status(200).send({ received: true })
      break
  }
}
