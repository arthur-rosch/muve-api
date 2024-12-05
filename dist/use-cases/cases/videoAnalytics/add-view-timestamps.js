"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddViewTimestampsUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class AddViewTimestampsUseCase {
    constructor(usersRepository, videoRepository, videoAnalyticsRepository, viewTimestampRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
        this.videoAnalyticsRepository = videoAnalyticsRepository;
        this.viewTimestampRepository = viewTimestampRepository;
    }
    async execute({ userIp, videoId, endTimestamp, startTimestamp, deviceType, agent, country, region, city, }) {
        const video = await this.videoRepository.findById(videoId);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        const analytics = await this.videoAnalyticsRepository.findByVideoId(videoId);
        if (!analytics) {
            throw new erros_1.NotFoundErros('Video Analytics');
        }
        const view = await this.viewTimestampRepository.create({
            endTimestamp,
            startTimestamp,
            videoAnalytics: {
                connect: { id: analytics.id },
            },
            userIp,
            deviceType,
            agent,
            country,
            region,
            city,
        });
        const updatedAnalytics = await this.videoAnalyticsRepository.updateTotalPlays(analytics.id, analytics.totalPlays + 1);
        return {
            analytics: updatedAnalytics,
            view,
        };
    }
}
exports.AddViewTimestampsUseCase = AddViewTimestampsUseCase;
