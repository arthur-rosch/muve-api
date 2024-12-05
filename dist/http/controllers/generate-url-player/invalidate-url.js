"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateToken = invalidateToken;
const zod_1 = require("zod");
const make_invalidate_token_use_case_1 = require("../../../use-cases/factories/tokenPlayer/make-invalidate-token-use-case");
async function invalidateToken(request, reply) {
    const invalidateTokenBodySchema = zod_1.z.object({
        token: zod_1.z.string(),
    });
    const { token } = invalidateTokenBodySchema.parse(request.body);
    try {
        const invalidateTokenUseCase = (0, make_invalidate_token_use_case_1.makeInvalidateTokenUseCase)();
        await invalidateTokenUseCase.execute(token);
        return reply.status(200).send({ message: 'Token invalidated successfully' });
    }
    catch (err) {
        return reply.status(500).send({ message: err.message });
    }
}
