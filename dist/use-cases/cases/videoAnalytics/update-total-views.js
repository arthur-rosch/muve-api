"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTotalViewsUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class UpdateTotalViewsUseCase {
    constructor(videoRepository, videoAnalyticsRepository) {
        this.videoRepository = videoRepository;
        this.videoAnalyticsRepository = videoAnalyticsRepository;
    }
    async execute({ videoId, }) {
        const video = await this.videoRepository.findById(videoId);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        const analytics = await this.videoAnalyticsRepository.findByVideoId(video.id);
        if (!analytics) {
            throw new erros_1.NotFoundErros('Video Analytics');
        }
        const totalViews = await this.videoAnalyticsRepository.updateTotalViews(analytics.id, analytics.totalViews + 1);
        return {
            analytics: totalViews,
        };
    }
}
exports.UpdateTotalViewsUseCase = UpdateTotalViewsUseCase;
