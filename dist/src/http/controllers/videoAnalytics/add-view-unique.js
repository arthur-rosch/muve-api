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
exports.addViewUnique = addViewUnique;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_add_view_use_case_1 = require("@/use-cases/factories/videoAnalytics/make-add-view-use-case");
function addViewUnique(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const videoAnalytics = yield addViewUniqueUseCase.execute({
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
    });
}
