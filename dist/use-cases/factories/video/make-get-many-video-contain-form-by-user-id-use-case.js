"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetManyVideoContainFormByUserIdUseCase = makeGetManyVideoContainFormByUserIdUseCase;
const get_many_videos_contain_form_by_user_id_1 = require("../../cases/video/get-many-videos-contain-form-by-user-id");
const prisma_1 = require("../../../repositories/prisma");
function makeGetManyVideoContainFormByUserIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const getManyVideoContainFormByUserIdUseCase = new get_many_videos_contain_form_by_user_id_1.GetManyVideoContainFormByUserIdUseCase(usersRepository, videoRepository);
    return getManyVideoContainFormByUserIdUseCase;
}
