"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = deleteVideo;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_delete_video_use_case_1 = require("../../../use-cases/factories/video/make-delete-video-use-case");
async function deleteVideo(request, reply) {
    const deleteVideoParamsSchema = zod_1.z.object({
        videoId: zod_1.z.string(),
    });
    const { videoId } = deleteVideoParamsSchema.parse(request.params);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const deleteVideoUseCase = (0, make_delete_video_use_case_1.makeDeleteVideoUseCase)();
        const video = await deleteVideoUseCase.execute({
            userId,
            videoId,
        });
        return reply.status(200).send(video);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
