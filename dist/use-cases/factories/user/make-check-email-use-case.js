"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCheckEmailUseCase = makeCheckEmailUseCase;
const check_email_1 = require("../../cases/users/check-email");
const prisma_user_repository_1 = require("../../../repositories/prisma/prisma-user-repository");
function makeCheckEmailUseCase() {
    const usersRepository = new prisma_user_repository_1.PrimasUsersRepository();
    const checkEmailUseCase = new check_email_1.CheckEmailUseCase(usersRepository);
    return checkEmailUseCase;
}
