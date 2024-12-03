"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSignaturesRepository = void 0;
const lib_1 = require("../../lib");
class PrismaSignaturesRepository {
    findLastByStripeSubscriptionId(subscriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = yield lib_1.prisma.signature.findFirst({
                where: { stripe_subscription_id: subscriptionId },
            });
            return signature;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = yield lib_1.prisma.signature.findFirst({
                where: {
                    userId,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return signature;
        });
    }
    findManyByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const signatures = yield lib_1.prisma.signature.findMany({
                where: {
                    userId,
                },
            });
            return signatures;
        });
    }
    checkStatusSignature(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = yield lib_1.prisma.signature.findFirst({
                where: {
                    userId,
                },
                orderBy: {
                    created_at: 'desc',
                },
            });
            return signature;
        });
    }
    updateStatusSignature(signatureId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSignature = yield lib_1.prisma.signature.update({
                where: {
                    id: signatureId,
                },
                data: {
                    status,
                },
            });
            return updatedSignature;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedSignature = yield lib_1.prisma.signature.delete({
                where: {
                    id,
                },
            });
            return deletedSignature;
        });
    }
    update(id, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSignature = yield lib_1.prisma.signature.update({
                where: {
                    id,
                },
                data: signature,
            });
            return updatedSignature;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdSignature = yield lib_1.prisma.signature.create({
                data,
            });
            return createdSignature;
        });
    }
    getSignaturesTwoDaysAfterCreation() {
        return __awaiter(this, void 0, void 0, function* () {
            const twoDaysAgo = new Date();
            twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
            twoDaysAgo.setHours(0, 0, 0, 0);
            const endOfTwoDaysAgo = new Date();
            endOfTwoDaysAgo.setDate(endOfTwoDaysAgo.getDate() - 2);
            endOfTwoDaysAgo.setHours(23, 59, 59, 999);
            return lib_1.prisma.signature.findMany({
                where: {
                    status: 'trialing',
                    created_at: {
                        gte: twoDaysAgo,
                        lte: endOfTwoDaysAgo,
                    },
                },
                include: {
                    user: true,
                },
            });
        });
    }
    getSignaturesAtHalfTrial() {
        return __awaiter(this, void 0, void 0, function* () {
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
            const startOfDay = new Date(threeDaysAgo.setHours(0, 0, 0, 0));
            const endOfDay = new Date(threeDaysAgo.setHours(23, 59, 59, 999));
            console.log('Intervalo para assinaturas com 3 dias de criação:', startOfDay, endOfDay);
            return lib_1.prisma.signature.findMany({
                where: {
                    status: 'trialing',
                    created_at: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                include: {
                    user: true,
                },
            });
        });
    }
    getSignaturesTwoDaysBeforeTrialEnds() {
        return __awaiter(this, void 0, void 0, function* () {
            const fiveDaysAgo = new Date();
            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
            const startOfDay = new Date(fiveDaysAgo.setHours(0, 0, 0, 0));
            const endOfDay = new Date(fiveDaysAgo.setHours(23, 59, 59, 999));
            return lib_1.prisma.signature.findMany({
                where: {
                    status: 'trialing',
                    created_at: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                include: {
                    user: true,
                },
            });
        });
    }
}
exports.PrismaSignaturesRepository = PrismaSignaturesRepository;
