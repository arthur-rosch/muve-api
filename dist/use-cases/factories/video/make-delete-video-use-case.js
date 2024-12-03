"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteVideoUseCase = makeDeleteVideoUseCase;
const delete_1 = require("../../cases/video/delete");
const prisma_1 = require("../../../repositories/prisma");
function makeDeleteVideoUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const deleteVideoUseCase = new delete_1.DeleteVideoUseCase(usersRepository, videoRepository);
    return deleteVideoUseCase;
}
