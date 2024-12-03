"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdatePasswordUseCase = makeUpdatePasswordUseCase;
const update_password_1 = require("../../cases/users/update-password");
const prisma_user_repository_1 = require("@/repositories/prisma/prisma-user-repository");
function makeUpdatePasswordUseCase() {
    const usersRepository = new prisma_user_repository_1.PrimasUsersRepository();
    const updatePasswordUseCase = new update_password_1.UpdatePasswordUseCase(usersRepository);
    return updatePasswordUseCase;
}
