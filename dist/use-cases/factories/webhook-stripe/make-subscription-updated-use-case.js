"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSubscriptionUpdatedUseCase = makeSubscriptionUpdatedUseCase;
const prisma_1 = require("../../../repositories/prisma");
const subscription_updated_1 = require("../../cases/webhook-stripe/subscription-updated");
function makeSubscriptionUpdatedUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signaturesRepository = new prisma_1.PrismaSignaturesRepository();
    const subscriptionUpdatedUseCase = new subscription_updated_1.SubscriptionUpdatedUseCase(usersRepository, signaturesRepository);
    return subscriptionUpdatedUseCase;
}
