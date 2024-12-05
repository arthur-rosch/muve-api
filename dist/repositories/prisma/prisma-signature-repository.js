"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaSignaturesRepository = void 0;
const lib_1 = require("../../lib");
class PrismaSignaturesRepository {
    async findLastByStripeSubscriptionId(subscriptionId) {
        const signature = await lib_1.prisma.signature.findFirst({
            where: { stripe_subscription_id: subscriptionId },
        });
        return signature;
    }
    async findByUserId(userId) {
        const signature = await lib_1.prisma.signature.findFirst({
            where: {
                userId,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        return signature;
    }
    async findManyByUserId(userId) {
        const signatures = await lib_1.prisma.signature.findMany({
            where: {
                userId,
            },
        });
        return signatures;
    }
    async checkStatusSignature(userId) {
        const signature = await lib_1.prisma.signature.findFirst({
            where: {
                userId,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        return signature;
    }
    async updateStatusSignature(signatureId, status) {
        const updatedSignature = await lib_1.prisma.signature.update({
            where: {
                id: signatureId,
            },
            data: {
                status,
            },
        });
        return updatedSignature;
    }
    async delete(id) {
        const deletedSignature = await lib_1.prisma.signature.delete({
            where: {
                id,
            },
        });
        return deletedSignature;
    }
    async update(id, signature) {
        const updatedSignature = await lib_1.prisma.signature.update({
            where: {
                id,
            },
            data: signature,
        });
        return updatedSignature;
    }
    async create(data) {
        const createdSignature = await lib_1.prisma.signature.create({
            data,
        });
        return createdSignature;
    }
    async getSignaturesTwoDaysAfterCreation() {
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
    }
    async getSignaturesAtHalfTrial() {
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
    }
    async getSignaturesTwoDaysBeforeTrialEnds() {
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
    }
}
exports.PrismaSignaturesRepository = PrismaSignaturesRepository;
