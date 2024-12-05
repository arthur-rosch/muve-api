"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaEmailVerificationRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaEmailVerificationRepository {
    async create(email, code) {
        return prisma.emailVerification.create({
            data: { email, code },
        });
    }
    async findByEmail(email) {
        return prisma.emailVerification.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        return prisma.emailVerification.findUnique({
            where: { id },
        });
    }
    async findByCode(code) {
        return prisma.emailVerification.findFirst({
            where: { code },
        });
    }
    async updateVerificationStatus(email) {
        return prisma.emailVerification.update({
            where: { email },
            data: { isVerified: true },
        });
    }
    async updateCode(email, code) {
        return prisma.emailVerification.update({
            where: { email },
            data: { code },
        });
    }
}
exports.PrismaEmailVerificationRepository = PrismaEmailVerificationRepository;
