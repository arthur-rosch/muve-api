"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeValidateSignedUrlUseCase = makeValidateSignedUrlUseCase;
const prisma_1 = require("../../../repositories/prisma");
const validate_signed_url_1 = require("../../cases/tokenPlayer/validate-signed-url");
function makeValidateSignedUrlUseCase() {
    const tokenPlayerRepository = new prisma_1.PrismaTokenPlayerRepository();
    const validateSignedUrlUseCase = new validate_signed_url_1.ValidateSignedUrlUseCase(tokenPlayerRepository);
    return validateSignedUrlUseCase;
}
