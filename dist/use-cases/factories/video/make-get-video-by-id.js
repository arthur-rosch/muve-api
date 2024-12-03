"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetVideoByIdUseCase = makeGetVideoByIdUseCase;
const get_video_by_id_1 = require("../../cases/video/get-video-by-id");
const prisma_1 = require("../../../repositories/prisma");
function makeGetVideoByIdUseCase() {
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const getVideoByIdUseCase = new get_video_by_id_1.GetVideoByIdUseCase(usersRepository, videoRepository, signatureRepository);
    return getVideoByIdUseCase;
}
