"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLeadsFormsByVideoId = getAllLeadsFormsByVideoId;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_get_all_leads_by_video_id_1 = require("../../../use-cases/factories/video-form/make-get-all-leads-by-video-id");
async function getAllLeadsFormsByVideoId(request, reply) {
    const paramsSchema = zod_1.z.object({
        videoId: zod_1.z.string(),
    });
    const { videoId } = paramsSchema.parse(request.params);
    try {
        const userId = request.user?.sub;
        if (!userId) {
            return reply.status(401).send({ message: 'User not authenticated' });
        }
        const getAllLeadsFormsByVideoIdUseCase = (0, make_get_all_leads_by_video_id_1.makeGetAllLeadsFormsByVideoIdUseCase)();
        const { leadFormVideos } = await getAllLeadsFormsByVideoIdUseCase.execute({
            videoId,
            userId,
        });
        return reply.status(200).send({ leadFormVideos });
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
