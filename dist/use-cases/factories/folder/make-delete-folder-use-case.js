"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDeleteFolderUseCase = makeDeleteFolderUseCase;
const delete_1 = require("../../cases/folder/delete");
const prisma_1 = require("../../../repositories/prisma");
function makeDeleteFolderUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const folderRepository = new prisma_1.PrismaFoldersRepository();
    const deleteFolderUseCase = new delete_1.DeleteFolderUseCase(usersRepository, folderRepository);
    return deleteFolderUseCase;
}
