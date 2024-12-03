"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(data.userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const video = yield this.videoRepository.findById(data.videoId);
            if (!video) {
                throw new erros_1.NotFoundErros('Video');
            }
            if (video.userId !== user.id) {
                throw new erros_1.AccessDeniedError('Video');
            }
            let chaptersData;
            let buttonsData;
            const videoUpdated = yield this.videoRepository.update(data.videoId, data.dataEdit);
            if (video.type === 'Curso' && data.Chapters) {
                chaptersData = data.Chapters.map((chapter) => ({
                    title: chapter.title,
                    startTime: chapter.startTime,
                    endTime: chapter.endTime,
                    videoId: video.id,
                }));
            }
            if (video.type === 'Vsl' && data.Buttons) {
                buttonsData = data.Buttons.map((button) => (Object.assign(Object.assign({}, button), { videoId: video.id })));
            }
            if (video.type === 'Curso' && chaptersData) {
                yield this.chaptersRepository.deleteManyByVideoId(video.id);
                yield this.chaptersRepository.createMany(chaptersData);
            }
            if (video.type === 'Vsl' && buttonsData) {
                yield this.videoButtonsRepository.deleteManyByVideoId(video.id);
                yield this.videoButtonsRepository.createMany(buttonsData);
            }
            return {
                videoUpdated,
            };
        });
    }
}
exports.EditPlayerVideo = EditPlayerVideo;
