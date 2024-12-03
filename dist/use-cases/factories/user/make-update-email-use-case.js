"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUpdateEmailUseCase = makeUpdateEmailUseCase;
const update_email_1 = require("../../cases/users/update-email");
const prisma_user_repository_1 = require("../../../repositories/prisma/prisma-user-repository");
function makeUpdateEmailUseCase() {
    const usersRepository = new prisma_user_repository_1.PrimasUsersRepository();
    const updateEmailUseCase = new update_email_1.UpdateEmailUseCase(usersRepository);
    return updateEmailUseCase;
}
