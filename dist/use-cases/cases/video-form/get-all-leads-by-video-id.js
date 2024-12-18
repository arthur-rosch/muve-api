"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllLeadsFormsByVideoIdUseCase = void 0;
const erros_1 = require("../../erros");
class GetAllLeadsFormsByVideoIdUseCase {
    constructor(userRepository, videoRepository, videoLeadFormRepository) {
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
        this.videoLeadFormRepository = videoLeadFormRepository;
    }
    async execute({ videoId, userId, }) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const video = await this.videoRepository.findById(videoId);
        if (!video) {
            throw new erros_1.NotFoundErros('User');
        }
        if (video.userId !== user.id) {
            throw new erros_1.AccessDeniedError('Update video form');
        }
        const leadFormVideos = await this.videoLeadFormRepository.findManyByVideoId(videoId);
        if (!leadFormVideos) {
            return { leadFormVideos: [] };
        }
        return {
            leadFormVideos: Array.isArray(leadFormVideos)
                ? leadFormVideos
                : [leadFormVideos],
        };
    }
}
exports.GetAllLeadsFormsByVideoIdUseCase = GetAllLeadsFormsByVideoIdUseCase;
