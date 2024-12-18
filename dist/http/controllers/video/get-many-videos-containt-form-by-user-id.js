"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyVideoContainFormByUserId = getManyVideoContainFormByUserId;
const erros_1 = require("../../../use-cases/erros");
const make_get_many_video_contain_form_by_user_id_use_case_1 = require("../../../use-cases/factories/video/make-get-many-video-contain-form-by-user-id-use-case");
async function getManyVideoContainFormByUserId(request, reply) {
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const getManyVideoContainFormByUserIdUseCase = (0, make_get_many_video_contain_form_by_user_id_use_case_1.makeGetManyVideoContainFormByUserIdUseCase)();
        const videos = await getManyVideoContainFormByUserIdUseCase.execute({
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
