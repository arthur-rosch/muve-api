"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCheckoutExpiredUseCase = makeCheckoutExpiredUseCase;
const prisma_1 = require("@/repositories/prisma");
const checkout_expired_1 = require("../../cases/webhook-stripe/checkout-expired");
function makeCheckoutExpiredUseCase() {
    const leadsRepository = new prisma_1.PrismaLeadsRepository();
    const checkoutExpiredUseCase = new checkout_expired_1.CheckoutExpiredUseCase(leadsRepository);
    return checkoutExpiredUseCase;
}
