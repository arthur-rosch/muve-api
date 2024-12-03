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
exports.PrismaFoldersRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaFoldersRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield prisma_1.prisma.folder.findFirst({
                where: {
                    id,
                },
                include: {
                    videos: true,
                },
            });
            return folder;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield prisma_1.prisma.folder.findFirst({
                where: {
                    userId,
                },
                include: {
                    videos: true,
                },
            });
            return folder;
        });
    }
    findManyByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const folders = yield prisma_1.prisma.folder.findMany({
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
        });
    }
    favoriteFolder(folderId, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield prisma_1.prisma.folder.update({
                where: {
                    id: folderId,
                },
                data: {
                    favorite: value,
                },
            });
            return folder;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield prisma_1.prisma.folder.create({
                data,
                include: {
                    videos: true,
                },
            });
            return folder;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield prisma_1.prisma.folder.delete({
                where: {
                    id,
                },
            });
            return folder;
        });
    }
}
exports.PrismaFoldersRepository = PrismaFoldersRepository;
