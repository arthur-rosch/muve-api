"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditFolderIdVideoUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class EditFolderIdVideoUseCase {
    constructor(userRepository, videoRepository, folderRepository) {
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
        this.folderRepository = folderRepository;
    }
    async execute({ videoId, folderId, userId, }) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const folder = await this.folderRepository.findById(folderId);
        if (!folder) {
            throw new erros_1.NotFoundErros('Folder');
        }
        const video = await this.videoRepository.findById(videoId);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        if (video.userId !== user.id && folder.userId !== user.id) {
            throw new erros_1.AccessDeniedError('Folder');
        }
        if (video.userId !== user.id) {
            throw new erros_1.AccessDeniedError('Video');
        }
        const newVideo = await this.videoRepository.updateFolderId(videoId, folderId);
        return { video: newVideo };
    }
}
exports.EditFolderIdVideoUseCase = EditFolderIdVideoUseCase;
