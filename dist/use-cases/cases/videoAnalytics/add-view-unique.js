"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddViewUniquesUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class AddViewUniquesUseCase {
    constructor(videoRepository, viewUniqueRepository, videoAnalyticsRepository) {
        this.videoRepository = videoRepository;
        this.viewUniqueRepository = viewUniqueRepository;
        this.videoAnalyticsRepository = videoAnalyticsRepository;
    }
    async execute({ userIp, videoId, deviceType, agent, country, region, city, }) {
        const video = await this.videoRepository.findById(videoId);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        const analytics = await this.videoAnalyticsRepository.findByVideoId(videoId);
        if (!analytics) {
            throw new erros_1.NotFoundErros('Video Analytics');
        }
        const view = await this.viewUniqueRepository.create({
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
        const updatedAnalytics = await this.videoAnalyticsRepository.updateTotalViews(analytics.id, analytics.totalViews + 1);
        return {
            analytics: updatedAnalytics,
            view,
        };
    }
}
exports.AddViewUniquesUseCase = AddViewUniquesUseCase;
