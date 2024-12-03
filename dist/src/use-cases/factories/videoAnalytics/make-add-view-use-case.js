"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddViewUniquesUseCase = makeAddViewUniquesUseCase;
const add_view_unique_1 = require("../../cases/videoAnalytics/add-view-unique");
const prisma_1 = require("@/repositories/prisma");
function makeAddViewUniquesUseCase() {
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const viewUniqueRepository = new prisma_1.PrimasViewUniqueRepository();
    const videoAnalyticsRepository = new prisma_1.PrimasVideoAnalyticsRepository();
    const addViewUniquesUseCase = new add_view_unique_1.AddViewUniquesUseCase(videoRepository, viewUniqueRepository, videoAnalyticsRepository);
    return addViewUniquesUseCase;
}
