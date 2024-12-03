"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeForgotPasswordUseCase = makeForgotPasswordUseCase;
const forgot_password_1 = require("../../cases/users/forgot-password");
const prisma_user_repository_1 = require("@/repositories/prisma/prisma-user-repository");
function makeForgotPasswordUseCase() {
    const usersRepository = new prisma_user_repository_1.PrimasUsersRepository();
    const forgotPasswordUseCase = new forgot_password_1.ForgotPasswordUseCase(usersRepository);
    return forgotPasswordUseCase;
}
