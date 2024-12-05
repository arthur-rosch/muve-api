"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editFolderIdVideo = editFolderIdVideo;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_edit_folderId_vide_use_case_1 = require("../../../use-cases/factories/video/make-edit-folderId-vide-use-case");
async function editFolderIdVideo(request, reply) {
    const editFolderIdVideoBodySchema = zod_1.z.object({
        videoId: zod_1.z.string(),
        folderId: zod_1.z.string(),
    });
    const { videoId, folderId } = editFolderIdVideoBodySchema.parse(request.body);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const editFolderIdVideoUseCase = (0, make_edit_folderId_vide_use_case_1.makeEditFolderIdVideoUseCase)();
        const { video } = await editFolderIdVideoUseCase.execute({
            userId,
            videoId,
            folderId,
        });
        return reply.status(200).send(video);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        if (err instanceof erros_1.AccessDeniedError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
