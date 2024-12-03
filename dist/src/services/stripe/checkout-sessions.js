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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripeCheckout = void 0;
const lib_1 = require("@/lib");
const createStripeCheckout = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, leadId, priceId, success_url, }) {
    const checkout = yield lib_1.stripe.checkout.sessions.create({
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
});
exports.createStripeCheckout = createStripeCheckout;
