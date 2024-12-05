"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimasViewTimestampRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasViewTimestampRepository {
    async findById(id) {
        const view = await prisma_1.prisma.viewTimestamp.findUnique({
            where: {
                id,
            },
        });
        if (!view) {
            return null;
        }
        return view;
    }
    async findManyByVideoAnalyticsId(videoAnalyticsId) {
        const views = await prisma_1.prisma.viewTimestamp.findMany({
            where: {
                videoAnalyticsId,
            },
        });
        return views;
    }
    async create(data) {
        const view = await prisma_1.prisma.viewTimestamp.create({
            data,
        });
        return view;
    }
}
exports.PrimasViewTimestampRepository = PrimasViewTimestampRepository;
