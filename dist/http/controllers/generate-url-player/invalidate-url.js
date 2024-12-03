"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidateToken = invalidateToken;
const zod_1 = require("zod");
const make_invalidate_token_use_case_1 = require("../../../use-cases/factories/tokenPlayer/make-invalidate-token-use-case");
function invalidateToken(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const invalidateTokenBodySchema = zod_1.z.object({
            token: zod_1.z.string(),
        });
        const { token } = invalidateTokenBodySchema.parse(request.body);
        try {
            const invalidateTokenUseCase = (0, make_invalidate_token_use_case_1.makeInvalidateTokenUseCase)();
            yield invalidateTokenUseCase.execute(token);
            return reply.status(200).send({ message: 'Token invalidated successfully' });
        }
        catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });
}
