"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimasViewUniqueRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasViewUniqueRepository {
    async findById(id) {
        const view = await prisma_1.prisma.viewUnique.findUnique({
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
        const views = await prisma_1.prisma.viewUnique.findMany({
            where: {
                videoAnalyticsId,
            },
        });
        return views;
    }
    async create(data) {
        const view = await prisma_1.prisma.viewUnique.create({
            data,
        });
        return view;
    }
}
exports.PrimasViewUniqueRepository = PrimasViewUniqueRepository;
