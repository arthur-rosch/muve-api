"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddViewTimestampsUseCase = makeAddViewTimestampsUseCase;
const add_view_timestamps_1 = require("../../cases/videoAnalytics/add-view-timestamps");
const prisma_1 = require("@/repositories/prisma");
function makeAddViewTimestampsUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const viewTimestampRepository = new prisma_1.PrimasViewTimestampRepository();
    const videoAnalyticsRepository = new prisma_1.PrimasVideoAnalyticsRepository();
    const addViewTimestampsUseCase = new add_view_timestamps_1.AddViewTimestampsUseCase(usersRepository, videoRepository, videoAnalyticsRepository, viewTimestampRepository);
    return addViewTimestampsUseCase;
}
