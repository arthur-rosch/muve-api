"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = handleStripeWebhook;
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../../env");
const checkout_expired_1 = require("../controllers/webhook-stripe/checkout-expired");
const checkout_completed_1 = require("../controllers/webhook-stripe/checkout-completed");
const subscription_update_1 = require("../controllers/webhook-stripe/subscription-update");
const subscription_deleted_1 = require("../controllers/webhook-stripe/subscription-deleted");
const invoice_payment_failed_1 = require("../controllers/webhook-stripe/invoice-payment-failed");
const invoice_payment_succeeded_1 = require("../controllers/webhook-stripe/invoice-payment-succeeded");
function handleStripeWebhook(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const sig = request.headers['stripe-signature'];
        let event;
        try {
            event = stripe_1.default.webhooks.constructEvent(request.rawBody, sig, env_1.env.STRIPE_SECRET_WEBHOOK_KEY);
        }
        catch (err) {
            console.error(`⚠️  Webhook signature verification failed: ${err.message}`);
            return reply.status(400).send(`Webhook Error: ${err.message}`);
        }
        switch (event.type) {
            case 'checkout.session.expired':
                yield (0, checkout_expired_1.checkoutExpired)(request, reply, event.data.object);
                break;
            case 'checkout.session.completed':
                yield (0, checkout_completed_1.checkoutCompleted)(request, reply, event.data.object);
                break;
            case 'customer.subscription.deleted':
                yield (0, subscription_deleted_1.subscriptionDeleted)(reply, request, event.data.object);
                break;
            case 'customer.subscription.updated':
                yield (0, subscription_update_1.subscriptionUpdate)(reply, request, event.data.object);
                break;
            case 'invoice.payment_failed':
                yield (0, invoice_payment_failed_1.invoicePaymentFailed)(reply, request, event.data.object);
                break;
            case 'invoice.payment_succeeded':
                yield (0, invoice_payment_succeeded_1.invoicePaymentSucceeded)(reply, request, event.data.object);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
                reply.status(200).send({ received: true });
                break;
        }
    });
}
