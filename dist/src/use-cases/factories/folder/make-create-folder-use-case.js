"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateFolderUseCase = makeCreateFolderUseCase;
const create_1 = require("../../cases/folder/create");
const prisma_1 = require("@/repositories/prisma");
function makeCreateFolderUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const folderRepository = new prisma_1.PrismaFoldersRepository();
    const createFolderUseCase = new create_1.CreateFolderUseCase(usersRepository, folderRepository);
    return createFolderUseCase;
}
