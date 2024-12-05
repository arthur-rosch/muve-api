"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripeCheckout = void 0;
const lib_1 = require("../../lib");
const createStripeCheckout = async ({ email, leadId, priceId, success_url, }) => {
    const checkout = await lib_1.stripe.checkout.sessions.create({
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
    });
    return checkout;
};
exports.createStripeCheckout = createStripeCheckout;
