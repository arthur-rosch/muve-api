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
exports.generateSignedUrl = generateSignedUrl;
const zod_1 = require("zod");
const make_generate_signed_url_use_case_1 = require("../../../use-cases/factories/tokenPlayer/make-generate-signed-url-use-case");
function generateSignedUrl(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const generateSignedUrlBodySchema = zod_1.z.object({
            videoPlayerId: zod_1.z.string(),
        });
        const { videoPlayerId } = generateSignedUrlBodySchema.parse(request.body);
        try {
            const generateSignedUrlUseCase = (0, make_generate_signed_url_use_case_1.makeGenerateSignedUrlUseCase)();
            const signedUrl = yield generateSignedUrlUseCase.execute(videoPlayerId);
            return reply.status(200).send({ signedUrl });
        }
        catch (err) {
            return reply.status(500).send({ message: err.message });
        }
    });
}
