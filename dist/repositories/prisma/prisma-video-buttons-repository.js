"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVideoButtonsRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaVideoButtonsRepository {
    async findManyByVideoId(videoId) {
        const videoButtons = await prisma_1.prisma.videoButtons.findMany({
            where: {
                videoId,
            },
        });
        return videoButtons;
    }
    async deleteManyByVideoId(videoId) {
        const result = await prisma_1.prisma.$transaction(async (prisma) => {
            const videoButtons = await prisma.videoButtons.deleteMany({
                where: {
                    videoId,
                },
            });
            return videoButtons;
        });
        return result;
    }
    async createMany(data) {
        const videoButtons = await prisma_1.prisma.videoButtons.createMany({
            data,
        });
        return videoButtons;
    }
}
exports.PrismaVideoButtonsRepository = PrismaVideoButtonsRepository;
