"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSubscriptionsRenewedUseCase = makeSubscriptionsRenewedUseCase;
const subscriptionsRenewed_1 = require("../../cases/webhook-kirvano/subscriptionsRenewed");
const prisma_1 = require("@/repositories/prisma");
function makeSubscriptionsRenewedUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const subscriptionsRenewedUseCase = new subscriptionsRenewed_1.SubscriptionsRenewedUseCase(usersRepository, signatureRepository);
    return subscriptionsRenewedUseCase;
}
