"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddFavoriteUseCase = makeAddFavoriteUseCase;
const add_favorite_1 = require("../../cases/folder/add-favorite");
const prisma_1 = require("@/repositories/prisma");
function makeAddFavoriteUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const folderRepository = new prisma_1.PrismaFoldersRepository();
    const addFavoriteUseCase = new add_favorite_1.AddFavoriteUseCase(usersRepository, folderRepository);
    return addFavoriteUseCase;
}
