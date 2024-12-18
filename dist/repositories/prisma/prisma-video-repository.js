"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimasVideosRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasVideosRepository {
    async findById(id) {
        const video = await prisma_1.prisma.video.findUnique({
            where: {
                id,
            },
            include: {
                Chapter: true,
                VideoButtons: true,
            },
        });
        return video;
    }
    async findByUserId(userId) {
        const video = await prisma_1.prisma.video.findFirst({
            where: {
                userId,
            },
            include: {
                Chapter: true,
                VideoButtons: true,
            },
        });
        return video;
    }
    async findByPlayerId(id) {
        const video = await prisma_1.prisma.video.findFirst({
            where: {
                videoPlayerid: id,
            },
        });
        return video;
    }
    async findManyByUserId(userId) {
        const videos = await prisma_1.prisma.video.findMany({
            where: {
                userId,
            },
            include: {
                Chapter: true,
                VideoButtons: true,
                analytics: {
                    include: {
                        viewTimestamps: true,
                        viewUnique: true,
                    },
                },
            },
        });
        return videos;
    }
    async findManyContainVideoFormByUserId(userId) {
        const videos = await prisma_1.prisma.video.findMany({
            where: {
                userId,
                VideoForm: {
                    some: {},
                },
            },
            include: {
                VideoForm: {
                    include: {
                        LeadFormVideo: true,
                    },
                },
            },
        });
        return videos;
    }
    async findManyByNotFolderId(userId) {
        const videosNotFolderId = await prisma_1.prisma.video.findMany({
            where: {
                userId,
                folderId: undefined,
            },
            include: {
                Chapter: true,
                VideoButtons: true,
                analytics: {
                    include: {
                        viewTimestamps: true,
                        viewUnique: true,
                    },
                },
            },
        });
        return videosNotFolderId;
    }
    async create(data) {
        const video = await prisma_1.prisma.video.create({
            data,
        });
        return video;
    }
    async update(videoId, data) {
        const video = await prisma_1.prisma.video.update({
            where: {
                id: videoId,
            },
            data,
        });
        return video;
    }
    async delete(id) {
        const video = await prisma_1.prisma.video.delete({
            where: {
                id,
            },
        });
        return video;
    }
    async deleteAll(userId) {
        const video = await prisma_1.prisma.video.deleteMany({
            where: {
                userId,
            },
        });
        return video;
    }
    async updateFolderId(videoId, folderId) {
        const video = await prisma_1.prisma.video.update({
            where: {
                id: videoId,
            },
            data: {
                folder: {
                    connect: {
                        id: folderId,
                    },
                },
            },
        });
        return video;
    }
}
exports.PrimasVideosRepository = PrimasVideosRepository;
