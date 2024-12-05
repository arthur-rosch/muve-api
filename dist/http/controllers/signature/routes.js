"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureRoutes = signatureRoutes;
const verify_jwt_1 = require("../../middlewares/verify-jwt");
const get_many_by_user_id_1 = require("./get-many-by-user-id");
const create_checkout_stripe_1 = require("./create-checkout-stripe");
async function signatureRoutes(app) {
    app.get("/signature", { onRequest: [verify_jwt_1.verifyJwt] }, get_many_by_user_id_1.getManySignatureByUserId);
    app.post("/create/checkout", create_checkout_stripe_1.createStripeCheckout);
}
