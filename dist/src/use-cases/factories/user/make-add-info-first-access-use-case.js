"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddInfoFirstAccessUseCase = makeAddInfoFirstAccessUseCase;
const add_info_first_access_1 = require("../../cases/users/add-info-first-access");
const prisma_1 = require("@/repositories/prisma");
function makeAddInfoFirstAccessUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const addInfoFirstAccessUseCase = new add_info_first_access_1.AddInfoFirstAccessUseCase(usersRepository);
    return addInfoFirstAccessUseCase;
}
