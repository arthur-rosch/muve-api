"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoById = getVideoById;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_get_video_by_id_1 = require("../../../use-cases/factories/video/make-get-video-by-id");
async function getVideoById(request, reply) {
    const getVideoByIdParamsSchema = zod_1.z.object({
        videoId: zod_1.z.string(),
    });
    const { videoId } = getVideoByIdParamsSchema.parse(request.params);
    try {
        const getVideoByIdUseCase = (0, make_get_video_by_id_1.makeGetVideoByIdUseCase)();
        const video = await getVideoByIdUseCase.execute({
            videoId,
        });
        console.log(video);
        return reply.status(200).send(video);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
