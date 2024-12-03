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
exports.getConfigVideoByPlayerId = getConfigVideoByPlayerId;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_get_config_video_by_player_id_1 = require("@/use-cases/factories/video/make-get-config-video-by-player-id");
function getConfigVideoByPlayerId(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const getConfigVideoByPlayerIdParamsSchema = zod_1.z.object({
            videoPlayerId: zod_1.z.string(),
        });
        const { videoPlayerId } = getConfigVideoByPlayerIdParamsSchema.parse(request.params);
        try {
            const getConfigVideoByPlayerIdUseCase = (0, make_get_config_video_by_player_id_1.makeGetVideoByPlayerIdUseCase)();
            const configs = yield getConfigVideoByPlayerIdUseCase.execute({
                videoPlayerId,
            });
            return reply.status(200).send(configs);
        }
        catch (err) {
            if (err instanceof erros_1.NotFoundErros) {
                return reply.status(409).send({ message: err.message });
            }
            throw err;
        }
    });
}
