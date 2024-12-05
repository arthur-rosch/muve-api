"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteVideoUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class DeleteVideoUseCase {
    constructor(usersRepository, videoRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
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
        const deletedVideo = await this.videoRepository.delete(videoId);
        return {
            deletedVideo,
        };
    }
}
exports.DeleteVideoUseCase = DeleteVideoUseCase;
