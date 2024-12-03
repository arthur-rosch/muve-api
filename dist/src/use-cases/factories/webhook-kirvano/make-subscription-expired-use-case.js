"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSubscriptionExpiredUseCase = makeSubscriptionExpiredUseCase;
const subscriptionExpired_1 = require("../../cases/webhook-kirvano/subscriptionExpired");
const prisma_1 = require("@/repositories/prisma");
function makeSubscriptionExpiredUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videosRepository = new prisma_1.PrimasVideosRepository();
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const subscriptionExpiredUseCase = new subscriptionExpired_1.SubscriptionExpiredUseCase(usersRepository, videosRepository, signatureRepository);
    return subscriptionExpiredUseCase;
}
