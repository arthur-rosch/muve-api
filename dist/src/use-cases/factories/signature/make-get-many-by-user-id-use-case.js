"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetManySignatureByUserIdUseCase = makeGetManySignatureByUserIdUseCase;
const get_many_by_user_id_1 = require("../../cases/signature/get-many-by-user-id");
const prisma_1 = require("@/repositories/prisma");
function makeGetManySignatureByUserIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const getManySignatureByUserIdUseCase = new get_many_by_user_id_1.GetManySignatureByUserIdUseCase(usersRepository, signatureRepository);
    return getManySignatureByUserIdUseCase;
}
