"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTokenPlayerRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaTokenPlayerRepository {
    async createToken(token, videoPlayerId) {
        await prisma_1.prisma.token.create({
            data: {
                token,
                videoPlayerId,
                isValid: true,
            },
        });
    }
    async invalidateToken(token) {
        await prisma_1.prisma.token.updateMany({
            where: { token },
            data: { isValid: false },
        });
    }
    async isTokenValid(token) {
        const tokenRecord = await prisma_1.prisma.token.findUnique({
            where: { token },
        });
        return !!tokenRecord && tokenRecord.isValid;
    }
}
exports.PrismaTokenPlayerRepository = PrismaTokenPlayerRepository;
