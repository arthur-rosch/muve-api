"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaLeadsRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaLeadsRepository {
    async create(data) {
        const folder = await prisma_1.prisma.lead.create({
            data,
        });
        return folder;
    }
    async findById(id) {
        const lead = await prisma_1.prisma.lead.findUnique({
            where: {
                id,
            },
        });
        if (!lead) {
            return null;
        }
        return lead;
    }
    async findByEmail(email) {
        const user = await prisma_1.prisma.lead.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            return null;
        }
        return user;
    }
    async delete(id) {
        const lead = await prisma_1.prisma.lead.delete({
            where: {
                id,
            },
        });
        return lead;
    }
}
exports.PrismaLeadsRepository = PrismaLeadsRepository;
