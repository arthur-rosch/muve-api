"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignedUrl = generateSignedUrl;
const zod_1 = require("zod");
const make_generate_signed_url_use_case_1 = require("../../../use-cases/factories/tokenPlayer/make-generate-signed-url-use-case");
async function generateSignedUrl(request, reply) {
    const generateSignedUrlBodySchema = zod_1.z.object({
        videoPlayerId: zod_1.z.string(),
    });
    const { videoPlayerId } = generateSignedUrlBodySchema.parse(request.body);
    try {
        const generateSignedUrlUseCase = (0, make_generate_signed_url_use_case_1.makeGenerateSignedUrlUseCase)();
        const signedUrl = await generateSignedUrlUseCase.execute(videoPlayerId);
        return reply.status(200).send({ signedUrl });
    }
    catch (err) {
        return reply.status(500).send({ message: err.message });
    }
}
