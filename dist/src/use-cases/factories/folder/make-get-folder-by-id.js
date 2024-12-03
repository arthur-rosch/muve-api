"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetFolderByIdUseCase = makeGetFolderByIdUseCase;
const get_folder_by_id_1 = require("../../cases/folder/get-folder-by-id");
const prisma_1 = require("@/repositories/prisma");
function makeGetFolderByIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const folderRepository = new prisma_1.PrismaFoldersRepository();
    const getFolderByIdUseCase = new get_folder_by_id_1.GetFolderByIdUseCase(usersRepository, folderRepository);
    return getFolderByIdUseCase;
}
