"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCheckJwtUseCase = makeCheckJwtUseCase;
const checkJwt_1 = require("../../cases/users/checkJwt");
const prisma_user_repository_1 = require("../../../repositories/prisma/prisma-user-repository");
function makeCheckJwtUseCase() {
    const usersRepository = new prisma_user_repository_1.PrimasUsersRepository();
    const checkJwtUseCase = new checkJwt_1.CheckJwtUseCase(usersRepository);
    return checkJwtUseCase;
}
