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
exports.DeleteVideoUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class DeleteVideoUseCase {
    constructor(usersRepository, videoRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, videoId, }) {
            const user = yield this.usersRepository.findById(userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const video = yield this.videoRepository.findById(videoId);
            if (!video) {
                throw new erros_1.NotFoundErros('Video');
            }
            if (video.userId !== user.id) {
                throw new erros_1.AccessDeniedError('Folder');
            }
            const deletedVideo = yield this.videoRepository.delete(videoId);
            return {
                deletedVideo,
            };
        });
    }
}
exports.DeleteVideoUseCase = DeleteVideoUseCase;
