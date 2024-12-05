"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAnalyticsByVideoIdUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class GetAnalyticsByVideoIdUseCase {
    constructor(usersRepository, videoRepository, videoAnalyticsRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
        this.videoAnalyticsRepository = videoAnalyticsRepository;
    }
    async execute({ userId, videoId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const video = await this.videoRepository.findById(videoId);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        if (video.userId !== user.id) {
            throw new erros_1.AccessDeniedError('Folder');
        }
        console.log(videoId);
        const analytics = await this.videoAnalyticsRepository.findByVideoId(videoId);
        return {
            analytics,
        };
    }
}
exports.GetAnalyticsByVideoIdUseCase = GetAnalyticsByVideoIdUseCase;
