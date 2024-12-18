"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoForm = updateVideoForm;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_update_use_case_1 = require("../../../use-cases/factories/video-form/make-update-use-case");
async function updateVideoForm(request, reply) {
    const updateVideoFormBodySchema = zod_1.z.object({
        videoId: zod_1.z.string(),
        isActive: zod_1.z.boolean(),
        inputName: zod_1.z.boolean(),
        inputEmail: zod_1.z.boolean(),
        inputPhone: zod_1.z.boolean(),
    });
    const userId = request.user?.sub;
    const body = updateVideoFormBodySchema.parse(request.body);
    try {
        const updateVideoFormUseCase = (0, make_update_use_case_1.makeUpdateVideoFormUseCase)();
        const { videoForm } = await updateVideoFormUseCase.execute({
            userId,
            data: body,
            videoId: body.videoId,
        });
        return reply.status(200).send({ videoForm });
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof erros_1.AccessDeniedError) {
            return reply.status(403).send({ message: err.message });
        }
        throw err;
    }
}
