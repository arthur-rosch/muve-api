"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyVideoByUserId = getManyVideoByUserId;
const erros_1 = require("../../../use-cases/erros");
const make_get_many_videos_by_user_id_1 = require("../../../use-cases/factories/video/make-get-many-videos-by-user-id");
async function getManyVideoByUserId(request, reply) {
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const getManyVideoByUserIdUseCase = (0, make_get_many_videos_by_user_id_1.makeGetManyVideoByUserIdUseCase)();
        const videos = await getManyVideoByUserIdUseCase.execute({
            userId,
        });
        return reply.status(200).send(videos);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
