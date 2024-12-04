"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateStripeCheckoutUseCase = makeCreateStripeCheckoutUseCase;
const prisma_1 = require("../../../repositories/prisma");
const create_checkout_sessions_1 = require("../../cases/webhook-stripe/create-checkout-sessions");
function makeCreateStripeCheckoutUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const createStripeCheckoutUseCase = new create_checkout_sessions_1.CreateStripeCheckoutUseCase(usersRepository);
    return createStripeCheckoutUseCase;
}
