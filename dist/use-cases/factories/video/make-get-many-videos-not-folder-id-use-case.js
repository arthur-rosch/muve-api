"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetManyVideoNotFolderIdUseCase = makeGetManyVideoNotFolderIdUseCase;
const get_many_videos_not_folder_id_1 = require("../../cases/video/get-many-videos-not-folder-id");
const prisma_1 = require("../../../repositories/prisma");
function makeGetManyVideoNotFolderIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const getManyVideoNotFolderIdUseCase = new get_many_videos_not_folder_id_1.GetManyVideoNotFolderIdUseCase(usersRepository, videoRepository);
    return getManyVideoNotFolderIdUseCase;
}
