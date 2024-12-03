"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindByEmailUseCase = makeFindByEmailUseCase;
const find_by_email_1 = require("../../cases/users/find-by-email");
const prisma_user_repository_1 = require("../../../repositories/prisma/prisma-user-repository");
function makeFindByEmailUseCase() {
    const usersRepository = new prisma_user_repository_1.PrimasUsersRepository();
    const findByEmailUseCase = new find_by_email_1.FindByEmailUseCase(usersRepository);
    return findByEmailUseCase;
}
