"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimasVideoAnalyticsRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasVideoAnalyticsRepository {
    async findById(id) {
        const video = await prisma_1.prisma.videoAnalytics.findUnique({
            where: {
                id,
            },
        });
        if (!video) {
            return null;
        }
        return video;
    }
    async findByVideoId(videoId) {
        const video = await prisma_1.prisma.videoAnalytics.findFirst({
            where: {
                videoId,
            },
            include: {
                viewTimestamps: true,
                viewUnique: true,
            },
        });
        if (!video) {
            return null;
        }
        return video;
    }
    async create(data) {
        const video = await prisma_1.prisma.videoAnalytics.create({
            data,
        });
        return video;
    }
    async updateTotalPlays(id, totalPlays) {
        return prisma_1.prisma.videoAnalytics.update({
            where: { id },
            data: { totalPlays },
        });
    }
    async updateTotalViews(id, totalViews) {
        return prisma_1.prisma.videoAnalytics.update({
            where: { id },
            data: { totalViews },
        });
    }
}
exports.PrimasVideoAnalyticsRepository = PrimasVideoAnalyticsRepository;
