"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVideoFormRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaVideoFormRepository {
    async findById(id) {
        const videoForm = await prisma_1.prisma.videoForm.findUnique({
            where: { id },
        });
        return videoForm;
    }
    async findByVideoId(videoId) {
        const videoForm = await prisma_1.prisma.videoForm.findFirst({
            where: { videoId },
        });
        return videoForm;
    }
    async deleteByVideoId(videoId) {
        const result = await prisma_1.prisma.videoForm.deleteMany({
            where: { videoId },
        });
        return result;
    }
    async create(data) {
        const videoForm = await prisma_1.prisma.videoForm.create({
            data,
        });
        return videoForm;
    }
    async update(videoId, data) {
        const videoForm = await prisma_1.prisma.videoForm.update({
            where: { videoId },
            data,
        });
        return videoForm;
    }
}
exports.PrismaVideoFormRepository = PrismaVideoFormRepository;
