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
exports.PrimasViewTimestampRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrimasViewTimestampRepository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const view = yield prisma_1.prisma.viewTimestamp.findUnique({
                where: {
                    id,
                },
            });
            if (!view) {
                return null;
            }
            return view;
        });
    }
    findManyByVideoAnalyticsId(videoAnalyticsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const views = yield prisma_1.prisma.viewTimestamp.findMany({
                where: {
                    videoAnalyticsId,
                },
            });
            return views;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const view = yield prisma_1.prisma.viewTimestamp.create({
                data,
            });
            return view;
        });
    }
}
exports.PrimasViewTimestampRepository = PrimasViewTimestampRepository;
