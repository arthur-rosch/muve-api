"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCheckoutCompletedUseCase = makeCheckoutCompletedUseCase;
const prisma_1 = require("@/repositories/prisma");
const checkout_completed_1 = require("../../cases/webhook-stripe/checkout-completed");
function makeCheckoutCompletedUseCase() {
    const leadsRepository = new prisma_1.PrismaLeadsRepository();
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signaturesRepository = new prisma_1.PrismaSignaturesRepository();
    const checkoutCompletedUseCase = new checkout_completed_1.CheckoutCompletedUseCase(leadsRepository, usersRepository, signaturesRepository);
    return checkoutCompletedUseCase;
}
