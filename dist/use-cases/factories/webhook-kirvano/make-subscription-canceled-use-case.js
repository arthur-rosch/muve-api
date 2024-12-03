"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSubscriptionCanceledUseCase = makeSubscriptionCanceledUseCase;
const subscriptionCanceled_1 = require("../../cases/webhook-kirvano/subscriptionCanceled");
const prisma_1 = require("../../../repositories/prisma");
function makeSubscriptionCanceledUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videosRepository = new prisma_1.PrimasVideosRepository();
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const subscriptionCanceledUseCase = new subscriptionCanceled_1.SubscriptionCanceledUseCase(usersRepository, videosRepository, signatureRepository);
    return subscriptionCanceledUseCase;
}
