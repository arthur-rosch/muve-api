"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateVideoFormUseCase = makeUpdateVideoFormUseCase;
const update_1 = require("../../cases/video-form/update");
const prisma_1 = require("../../../repositories/prisma");
function makeUpdateVideoFormUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const videoFormRepository = new prisma_1.PrismaVideoFormRepository();
    const updateVideoFormUseCase = new update_1.UpdateVideoFormUseCase(usersRepository, videoRepository, videoFormRepository);
    return updateVideoFormUseCase;
}
