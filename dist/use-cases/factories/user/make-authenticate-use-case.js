"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthenticateUseCase = makeAuthenticateUseCase;
const authenticate_1 = require("../../cases/users/authenticate");
const prisma_1 = require("../../../repositories/prisma");
function makeAuthenticateUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signaturesRepository = new prisma_1.PrismaSignaturesRepository();
    const emailVerificationRepository = new prisma_1.PrismaEmailVerificationRepository();
    const authenticateUseCase = new authenticate_1.AuthenticateUseCase(usersRepository, signaturesRepository, emailVerificationRepository);
    return authenticateUseCase;
}
