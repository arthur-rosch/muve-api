"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRegisterUseCase = makeRegisterUseCase;
const register_1 = require("../../cases/users/register");
const prisma_1 = require("../../../repositories/prisma");
function makeRegisterUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signaturesRepository = new prisma_1.PrismaSignaturesRepository();
    const registerUseCase = new register_1.RegisterUseCase(usersRepository, signaturesRepository);
    return registerUseCase;
}
