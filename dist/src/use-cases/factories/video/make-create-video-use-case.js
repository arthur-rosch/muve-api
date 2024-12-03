"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateVideoUseCase = makeCreateVideoUseCase;
const create_1 = require("../../cases/video/create");
const prisma_1 = require("@/repositories/prisma");
function makeCreateVideoUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const folderRepository = new prisma_1.PrismaFoldersRepository();
    const chaptersRepository = new prisma_1.PrismaChaptersRepository();
    const videoAnalyticsRepository = new prisma_1.PrimasVideoAnalyticsRepository();
    const createVideoUseCase = new create_1.CreateVideoUseCase(usersRepository, videoRepository, folderRepository, chaptersRepository, videoAnalyticsRepository);
    return createVideoUseCase;
}
