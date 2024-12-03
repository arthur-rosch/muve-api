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
exports.getVideoById = getVideoById;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_get_video_by_id_1 = require("@/use-cases/factories/video/make-get-video-by-id");
function getVideoById(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const getVideoByIdParamsSchema = zod_1.z.object({
            videoId: zod_1.z.string(),
        });
        const { videoId } = getVideoByIdParamsSchema.parse(request.params);
        try {
            const getVideoByIdUseCase = (0, make_get_video_by_id_1.makeGetVideoByIdUseCase)();
            const video = yield getVideoByIdUseCase.execute({
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
    });
}
