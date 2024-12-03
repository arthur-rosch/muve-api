"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInvalidateTokenUseCase = makeInvalidateTokenUseCase;
const prisma_1 = require("../../../repositories/prisma");
const invalidate_token_1 = require("../../cases/tokenPlayer/invalidate-token");
function makeInvalidateTokenUseCase() {
    const tokenPlayerRepository = new prisma_1.PrismaTokenPlayerRepository();
    const invalidateTokenUseCase = new invalidate_token_1.InvalidateTokenUseCase(tokenPlayerRepository);
    return invalidateTokenUseCase;
}
