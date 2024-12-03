"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimasVideosRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasVideosRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.findUnique({
                where: {
                    id,
                },
                include: {
                    Chapter: true,
                    VideoButtons: true,
                },
            });
            return video;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.findFirst({
                where: {
                    userId,
                },
                include: {
                    Chapter: true,
                    VideoButtons: true,
                },
            });
            return video;
        });
    }
    findByPlayerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.findFirst({
                where: {
                    videoPlayerid: id,
                },
            });
            return video;
        });
    }
    findManyByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const videos = yield prisma_1.prisma.video.findMany({
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
        });
    }
    findManyByNotFolderId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const videosNotFolderId = yield prisma_1.prisma.video.findMany({
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
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.create({
                data,
            });
            return video;
        });
    }
    update(videoId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.update({
                where: {
                    id: videoId,
                },
                data,
            });
            return video;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.delete({
                where: {
                    id,
                },
            });
            return video;
        });
    }
    deleteAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.deleteMany({
                where: {
                    userId,
                },
            });
            return video;
        });
    }
    updateFolderId(videoId, folderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.update({
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
        });
    }
}
exports.PrimasVideosRepository = PrimasVideosRepository;
