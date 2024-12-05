"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPlayerVideo = void 0;
const erros_1 = require("../../../use-cases/erros");
class EditPlayerVideo {
    constructor(usersRepository, videoRepository, chaptersRepository, videoButtonsRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
        this.chaptersRepository = chaptersRepository;
        this.videoButtonsRepository = videoButtonsRepository;
    }
    async execute(data) {
        const user = await this.usersRepository.findById(data.userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const video = await this.videoRepository.findById(data.videoId);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        if (video.userId !== user.id) {
            throw new erros_1.AccessDeniedError('Video');
        }
        let chaptersData;
        let buttonsData;
        const videoUpdated = await this.videoRepository.update(data.videoId, data.dataEdit);
        if (video.type === 'Curso' && data.Chapters) {
            chaptersData = data.Chapters.map((chapter) => ({
                title: chapter.title,
                startTime: chapter.startTime,
                endTime: chapter.endTime,
                videoId: video.id,
            }));
        }
        if (video.type === 'Vsl' && data.Buttons) {
            buttonsData = data.Buttons.map((button) => ({
                ...button,
                videoId: video.id,
            }));
        }
        if (video.type === 'Curso' && chaptersData) {
            await this.chaptersRepository.deleteManyByVideoId(video.id);
            await this.chaptersRepository.createMany(chaptersData);
        }
        if (video.type === 'Vsl' && buttonsData) {
            await this.videoButtonsRepository.deleteManyByVideoId(video.id);
            await this.videoButtonsRepository.createMany(buttonsData);
        }
        return {
            videoUpdated,
        };
    }
}
exports.EditPlayerVideo = EditPlayerVideo;
