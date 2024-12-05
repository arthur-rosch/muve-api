"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigVideoByPlayerId = getConfigVideoByPlayerId;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_get_config_video_by_player_id_1 = require("../../../use-cases/factories/video/make-get-config-video-by-player-id");
async function getConfigVideoByPlayerId(request, reply) {
    const getConfigVideoByPlayerIdParamsSchema = zod_1.z.object({
        videoPlayerId: zod_1.z.string(),
    });
    const { videoPlayerId } = getConfigVideoByPlayerIdParamsSchema.parse(request.params);
    try {
        const getConfigVideoByPlayerIdUseCase = (0, make_get_config_video_by_player_id_1.makeGetVideoByPlayerIdUseCase)();
        const configs = await getConfigVideoByPlayerIdUseCase.execute({
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
}
