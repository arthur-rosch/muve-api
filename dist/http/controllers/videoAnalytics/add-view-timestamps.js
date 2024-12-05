"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addViewTimestamps = addViewTimestamps;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_add_view_timestamps_use_case_1 = require("../../../use-cases/factories/videoAnalytics/make-add-view-timestamps-use-case");
async function addViewTimestamps(request, reply) {
    const addViewTimestampsBodySchema = zod_1.z.object({
        videoId: zod_1.z.string(),
        userIp: zod_1.z.string(), // Adiciona userIp
        deviceType: zod_1.z.string(), // Adiciona deviceType
        agent: zod_1.z.string(), // Adiciona agent
        country: zod_1.z.string(), // Adiciona country
        region: zod_1.z.string(), // Adiciona region
        city: zod_1.z.string(), // Adiciona city
        endTimestamp: zod_1.z.number(),
        startTimestamp: zod_1.z.number(),
    });
    const { videoId, endTimestamp, startTimestamp, userIp, deviceType, agent, country, region, city, } = addViewTimestampsBodySchema.parse(request.body);
    try {
        const addViewTimestampsUseCase = (0, make_add_view_timestamps_use_case_1.makeAddViewTimestampsUseCase)();
        const videoAnalytics = await addViewTimestampsUseCase.execute({
            videoId,
            endTimestamp,
            startTimestamp,
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
