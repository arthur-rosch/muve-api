import stripe from 'stripe'
import { env } from '@/env'
import { FastifyRequest, FastifyReply } from 'fastify'
import { checkoutExpired } from '../controllers/webhook-stripe/checkout-expired'
import { checkoutCompleted } from '../controllers/webhook-stripe/checkout-completed'
import { subscriptionUpdate } from '../controllers/webhook-stripe/subscription-update'
import { subscriptionDeleted } from '../controllers/webhook-stripe/subscription-deleted'
import { invoicePaymentFailed } from '../controllers/webhook-stripe/invoice-payment-failed'
import { invoicePaymentSucceeded } from '../controllers/webhook-stripe/invoice-payment-succeeded'

export async function handleStripeWebhook(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sig = request.headers['stripe-signature'] as string
  let event

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      env.STRIPE_SECRET_WEBHOOK_KEY,
    )
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
    case 'customer.subscription.deleted':
      await subscriptionDeleted(reply, request, event.data.object)
      break

    case 'customer.subscription.updated':
      await subscriptionUpdate(reply, request, event.data.object)
      break

    case 'invoice.payment_failed':
      await invoicePaymentFailed(reply, request, event.data.object)
      break

    case 'invoice.payment_succeeded':
      await invoicePaymentSucceeded(reply, request, event.data.object)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
      reply.status(200).send({ received: true })
      break
  }
}
