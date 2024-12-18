"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVideoLeadFormRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaVideoLeadFormRepository {
    async findManyByFormId(id) {
        const leadFormVideo = await prisma_1.prisma.leadFormVideo.findFirst({
            where: { videoFormId: id },
        });
        return leadFormVideo;
    }
    async findManyByVideoId(id) {
        const leadFormVideo = await prisma_1.prisma.leadFormVideo.findFirst({
            where: { videoId: id },
        });
        return leadFormVideo;
    }
    async delete(id) {
        const result = await prisma_1.prisma.leadFormVideo.deleteMany({
            where: { id },
        });
        return result;
    }
    async create(data) {
        const leadFormVideo = await prisma_1.prisma.leadFormVideo.create({
            data,
        });
        return leadFormVideo;
    }
}
exports.PrismaVideoLeadFormRepository = PrismaVideoLeadFormRepository;
