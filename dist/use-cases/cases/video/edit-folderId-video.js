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
exports.EditFolderIdVideoUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class EditFolderIdVideoUseCase {
    constructor(userRepository, videoRepository, folderRepository) {
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
        this.folderRepository = folderRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ videoId, folderId, userId, }) {
            const user = yield this.userRepository.findById(userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const folder = yield this.folderRepository.findById(folderId);
            if (!folder) {
                throw new erros_1.NotFoundErros('Folder');
            }
            const video = yield this.videoRepository.findById(videoId);
            if (!video) {
                throw new erros_1.NotFoundErros('Video');
            }
            if (video.userId !== user.id && folder.userId !== user.id) {
                throw new erros_1.AccessDeniedError('Folder');
            }
            if (video.userId !== user.id) {
                throw new erros_1.AccessDeniedError('Video');
            }
            const newVideo = yield this.videoRepository.updateFolderId(videoId, folderId);
            return { video: newVideo };
        });
    }
}
exports.EditFolderIdVideoUseCase = EditFolderIdVideoUseCase;
