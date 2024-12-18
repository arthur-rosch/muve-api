"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVideoFormUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class UpdateVideoFormUseCase {
    constructor(userRepository, videoRepository, videoFormRepository) {
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
        this.videoFormRepository = videoFormRepository;
    }
    async execute({ videoId, userId, data, }) {
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
        const existingVideoForm = await this.videoFormRepository.findByVideoId(videoId);
        if (!existingVideoForm) {
            const createdVideoForm = await this.videoFormRepository.create({
                videoId: videoId,
                showIn: data.showIn,
                isActive: data.isActive,
                inputName: data.inputName,
                inputEmail: data.inputEmail,
                inputPhone: data.inputPhone,
            });
            return {
                videoForm: createdVideoForm,
            };
        }
        const updatedVideoForm = await this.videoFormRepository.update(videoId, data);
        return {
            videoForm: updatedVideoForm,
        };
    }
}
exports.UpdateVideoFormUseCase = UpdateVideoFormUseCase;
