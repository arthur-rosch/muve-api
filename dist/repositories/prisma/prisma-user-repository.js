"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimasUsersRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasUsersRepository {
    async findById(id) {
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                id,
            },
        });
        return user;
    }
    async findByCustomerId(id) {
        const user = await prisma_1.prisma.user.findFirst({
            where: {
                stripeCustomersId: id,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async create(data) {
        const user = await prisma_1.prisma.user.create({
            data: {
                ...data,
                role: 'MEMBER',
            },
        });
        return user;
    }
    async update(id, data) {
        const user = await prisma_1.prisma.user.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
        return user;
    }
}
exports.PrimasUsersRepository = PrimasUsersRepository;
