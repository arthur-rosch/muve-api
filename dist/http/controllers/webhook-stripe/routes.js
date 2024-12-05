"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookStripeRoutes = webhookStripeRoutes;
const stripeWebhook_1 = require("../../middlewares/stripeWebhook");
async function webhookStripeRoutes(app) {
    app.post("/webhook/stripe", {
        config: {
            rawBody: true,
        },
        handler: stripeWebhook_1.handleStripeWebhook,
    });
}
