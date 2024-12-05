"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsByVideoId = getAnalyticsByVideoId;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_get_analytics_by_video_id_use_case_1 = require("../../../use-cases/factories/videoAnalytics/make-get-analytics-by-video-id-use-case");
async function getAnalyticsByVideoId(request, reply) {
    const getAnalyticsByVideoIdParamsSchema = zod_1.z.object({
        videoId: zod_1.z.string().optional(),
    });
    const { videoId } = getAnalyticsByVideoIdParamsSchema.parse(request.params);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const getAnalyticsByVideoIdUseCase = (0, make_get_analytics_by_video_id_use_case_1.makeGetAnalyticsByVideoIdUseCase)();
        const videoAnalytics = await getAnalyticsByVideoIdUseCase.execute({
            userId,
            videoId,
        });
        return reply.status(200).send(videoAnalytics);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        if (err instanceof erros_1.AccessDeniedError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
