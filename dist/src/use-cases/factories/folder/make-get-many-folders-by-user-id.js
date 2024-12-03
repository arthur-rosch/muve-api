"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetManyFoldersByUserIdUseCase = makeGetManyFoldersByUserIdUseCase;
const get_many_folders_by_user_id_1 = require("../../cases/folder/get-many-folders-by-user-id");
const prisma_1 = require("@/repositories/prisma");
function makeGetManyFoldersByUserIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const folderRepository = new prisma_1.PrismaFoldersRepository();
    const getManyFoldersByUserIdUseCase = new get_many_folders_by_user_id_1.GetManyFoldersByUserIdUseCase(usersRepository, folderRepository);
    return getManyFoldersByUserIdUseCase;
}
