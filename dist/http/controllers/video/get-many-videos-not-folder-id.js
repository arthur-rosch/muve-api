"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyVideoNotFolderId = getManyVideoNotFolderId;
const erros_1 = require("../../../use-cases/erros");
const make_get_many_videos_not_folder_id_use_case_1 = require("../../../use-cases/factories/video/make-get-many-videos-not-folder-id-use-case");
async function getManyVideoNotFolderId(request, reply) {
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const getManyVideoNotFolderIdUseCase = (0, make_get_many_videos_not_folder_id_use_case_1.makeGetManyVideoNotFolderIdUseCase)();
        const videos = await getManyVideoNotFolderIdUseCase.execute({
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
