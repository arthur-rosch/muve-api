"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateTotalViewsUseCase = makeUpdateTotalViewsUseCase;
const update_total_views_1 = require("../../cases/videoAnalytics/update-total-views");
const prisma_1 = require("../../../repositories/prisma");
function makeUpdateTotalViewsUseCase() {
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const videoAnalyticsRepository = new prisma_1.PrimasVideoAnalyticsRepository();
    const updateTotalViewsUseCase = new update_total_views_1.UpdateTotalViewsUseCase(videoRepository, videoAnalyticsRepository);
    return updateTotalViewsUseCase;
}
