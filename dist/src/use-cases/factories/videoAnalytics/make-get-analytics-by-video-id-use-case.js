"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAnalyticsByVideoIdUseCase = makeGetAnalyticsByVideoIdUseCase;
const get_analytics_by_video_id_1 = require("../../cases/videoAnalytics/get-analytics-by-video-id");
const prisma_1 = require("@/repositories/prisma");
function makeGetAnalyticsByVideoIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const videoAnalyticsRepository = new prisma_1.PrimasVideoAnalyticsRepository();
    const getAnalyticsByVideoIdUseCase = new get_analytics_by_video_id_1.GetAnalyticsByVideoIdUseCase(usersRepository, videoRepository, videoAnalyticsRepository);
    return getAnalyticsByVideoIdUseCase;
}
