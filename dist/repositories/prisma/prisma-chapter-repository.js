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
exports.PrismaChaptersRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaChaptersRepository {
    findManyByVideoId(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapters = yield prisma_1.prisma.chapter.findMany({
                where: {
                    videoId,
                },
            });
            return chapters;
        });
    }
    deleteManyByVideoId(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield prisma_1.prisma.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                const chapter = yield prisma.chapter.deleteMany({
                    where: {
                        videoId,
                    },
                });
                return chapter;
            }));
            return result;
        });
    }
    createMany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield prisma_1.prisma.chapter.createMany({
                data,
            });
            return chapter;
        });
    }
}
exports.PrismaChaptersRepository = PrismaChaptersRepository;
