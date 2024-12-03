"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateSignatureUseCase = makeCreateSignatureUseCase;
const create_1 = require("../../cases/signature/create");
const prisma_1 = require("../../../repositories/prisma");
function makeCreateSignatureUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const createSignatureUseCase = new create_1.CreateSignatureUseCase(usersRepository, signatureRepository);
    return createSignatureUseCase;
}
