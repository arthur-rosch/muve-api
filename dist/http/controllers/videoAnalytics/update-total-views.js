"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTotalViews = updateTotalViews;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_update_view_use_case_1 = require("../../../use-cases/factories/videoAnalytics/make-update-view-use-case");
async function updateTotalViews(request, reply) {
    const updateTotalViewsParamsSchema = zod_1.z.object({
        videoId: zod_1.z.string().optional(),
    });
    const { videoId } = updateTotalViewsParamsSchema.parse(request.params);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const updateTotalViewsUseCase = (0, make_update_view_use_case_1.makeUpdateTotalViewsUseCase)();
        const videoAnalytics = await updateTotalViewsUseCase.execute({
            videoId,
        });
        return reply.status(200).send(videoAnalytics);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
