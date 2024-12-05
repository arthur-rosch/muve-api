"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaFoldersRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaFoldersRepository {
    async findById(id) {
        const folder = await prisma_1.prisma.folder.findFirst({
            where: {
                id,
            },
            include: {
                videos: true,
            },
        });
        return folder;
    }
    async findByUserId(userId) {
        const folder = await prisma_1.prisma.folder.findFirst({
            where: {
                userId,
            },
            include: {
                videos: true,
            },
        });
        return folder;
    }
    async findManyByUserId(userId) {
        const folders = await prisma_1.prisma.folder.findMany({
            where: {
                userId,
            },
            include: {
                videos: {
                    include: {
                        analytics: {
                            include: {
                                viewTimestamps: true,
                                viewUnique: true,
                            },
                        },
                        VideoButtons: true,
                        Chapter: true,
                    },
                },
            },
        });
        return folders;
    }
    async favoriteFolder(folderId, value) {
        const folder = await prisma_1.prisma.folder.update({
            where: {
                id: folderId,
            },
            data: {
                favorite: value,
            },
        });
        return folder;
    }
    async create(data) {
        const folder = await prisma_1.prisma.folder.create({
            data,
            include: {
                videos: true,
            },
        });
        return folder;
    }
    async delete(id) {
        const folder = await prisma_1.prisma.folder.delete({
            where: {
                id,
            },
        });
        return folder;
    }
}
exports.PrismaFoldersRepository = PrismaFoldersRepository;
