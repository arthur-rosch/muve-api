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
exports.addViewTimestamps = addViewTimestamps;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_add_view_timestamps_use_case_1 = require("@/use-cases/factories/videoAnalytics/make-add-view-timestamps-use-case");
function addViewTimestamps(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const videoAnalytics = yield addViewTimestampsUseCase.execute({
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
    });
}
