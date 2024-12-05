"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addViewUnique = addViewUnique;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_add_view_use_case_1 = require("../../../use-cases/factories/videoAnalytics/make-add-view-use-case");
async function addViewUnique(request, reply) {
    const addViewUniqueBodySchema = zod_1.z.object({
        videoId: zod_1.z.string(),
        userIp: zod_1.z.string(),
        deviceType: zod_1.z.string(),
        agent: zod_1.z.string(),
        country: zod_1.z.string(),
        region: zod_1.z.string(),
        city: zod_1.z.string(),
    });
    const { videoId, userIp, deviceType, agent, country, region, city } = addViewUniqueBodySchema.parse(request.body);
    try {
        const addViewUniqueUseCase = (0, make_add_view_use_case_1.makeAddViewUniquesUseCase)();
        const videoAnalytics = await addViewUniqueUseCase.execute({
            videoId,
            userIp,
            deviceType,
            agent,
            country,
            region,
            city,
        });
        return reply.status(201).send(videoAnalytics);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
