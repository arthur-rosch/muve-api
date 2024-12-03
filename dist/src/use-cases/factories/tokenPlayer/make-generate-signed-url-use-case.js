"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGenerateSignedUrlUseCase = makeGenerateSignedUrlUseCase;
const prisma_1 = require("@/repositories/prisma");
const generate_signed_url_1 = require("../../cases/tokenPlayer/generate-signed-url");
function makeGenerateSignedUrlUseCase() {
    const tokenPlayerRepository = new prisma_1.PrismaTokenPlayerRepository();
    const generateSignedUrlUseCase = new generate_signed_url_1.GenerateSignedUrlUseCase(tokenPlayerRepository);
    return generateSignedUrlUseCase;
}
