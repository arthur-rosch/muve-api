"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePurchaseApprovedUseCase = makePurchaseApprovedUseCase;
const purchaseApproved_1 = require("../../cases/webhook-kirvano/purchaseApproved");
const prisma_1 = require("@/repositories/prisma");
function makePurchaseApprovedUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const purchaseApprovedUseCase = new purchaseApproved_1.PurchaseApprovedUseCase(usersRepository, signatureRepository);
    return purchaseApprovedUseCase;
}
