"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetManyVideoByUserIdUseCase = makeGetManyVideoByUserIdUseCase;
const get_many_videos_by_user_id_1 = require("../../cases/video/get-many-videos-by-user-id");
const prisma_1 = require("../../../repositories/prisma");
function makeGetManyVideoByUserIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const getManyVideoByUserIdUseCase = new get_many_videos_by_user_id_1.GetManyVideoByUserIdUseCase(usersRepository, videoRepository);
    return getManyVideoByUserIdUseCase;
}
