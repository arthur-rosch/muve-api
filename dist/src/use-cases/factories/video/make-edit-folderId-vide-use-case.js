"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEditFolderIdVideoUseCase = makeEditFolderIdVideoUseCase;
const edit_folderId_video_1 = require("../../cases/video/edit-folderId-video");
const prisma_1 = require("@/repositories/prisma");
function makeEditFolderIdVideoUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const folderRepository = new prisma_1.PrismaFoldersRepository();
    const editFolderIdVideoUseCase = new edit_folderId_video_1.EditFolderIdVideoUseCase(usersRepository, videoRepository, folderRepository);
    return editFolderIdVideoUseCase;
}
