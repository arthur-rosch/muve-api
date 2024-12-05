"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaChaptersRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaChaptersRepository {
    async findManyByVideoId(videoId) {
        const chapters = await prisma_1.prisma.chapter.findMany({
            where: {
                videoId,
            },
        });
        return chapters;
    }
    async deleteManyByVideoId(videoId) {
        const result = await prisma_1.prisma.$transaction(async (prisma) => {
            const chapter = await prisma.chapter.deleteMany({
                where: {
                    videoId,
                },
            });
            return chapter;
        });
        return result;
    }
    async createMany(data) {
        const chapter = await prisma_1.prisma.chapter.createMany({
            data,
        });
        return chapter;
    }
}
exports.PrismaChaptersRepository = PrismaChaptersRepository;
