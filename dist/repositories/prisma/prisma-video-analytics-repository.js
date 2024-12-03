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
exports.PrimasVideoAnalyticsRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasVideoAnalyticsRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.videoAnalytics.findUnique({
                where: {
                    id,
                },
            });
            if (!video) {
                return null;
            }
            return video;
        });
    }
    findByVideoId(videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.videoAnalytics.findFirst({
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
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.videoAnalytics.create({
                data,
            });
            return video;
        });
    }
    updateTotalPlays(id, totalPlays) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.videoAnalytics.update({
                where: { id },
                data: { totalPlays },
            });
        });
    }
    updateTotalViews(id, totalViews) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma_1.prisma.videoAnalytics.update({
                where: { id },
                data: { totalViews },
            });
        });
    }
}
exports.PrimasVideoAnalyticsRepository = PrimasVideoAnalyticsRepository;
