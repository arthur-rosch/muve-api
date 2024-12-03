"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSubscriptionDeletedUseCase = makeSubscriptionDeletedUseCase;
const prisma_1 = require("../../../repositories/prisma");
const subscription_deleted_1 = require("../../cases/webhook-stripe/subscription-deleted");
function makeSubscriptionDeletedUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signaturesRepository = new prisma_1.PrismaSignaturesRepository();
    const subscriptionDeletedUseCase = new subscription_deleted_1.SubscriptionDeletedUseCase(usersRepository, signaturesRepository);
    return subscriptionDeletedUseCase;
}
