"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolder = deleteFolder;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_delete_folder_use_case_1 = require("../../../use-cases/factories/folder/make-delete-folder-use-case");
async function deleteFolder(request, reply) {
    const deleteFolderBodySchema = zod_1.z.object({
        folderId: zod_1.z.string(),
    });
    const { folderId } = deleteFolderBodySchema.parse(request.params);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const deleteFolderUseCase = (0, make_delete_folder_use_case_1.makeDeleteFolderUseCase)();
        const folder = await deleteFolderUseCase.execute({
            userId,
            folderId,
        });
        return reply.status(200).send(folder);
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
