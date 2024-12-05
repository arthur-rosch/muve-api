"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFolderById = getFolderById;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_get_folder_by_id_1 = require("../../../use-cases/factories/folder/make-get-folder-by-id");
async function getFolderById(request, reply) {
    const getFolderByIdBodySchema = zod_1.z.object({
        folderId: zod_1.z.string(),
    });
    const { folderId } = getFolderByIdBodySchema.parse(request.params);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const getFolderByIdUseCase = (0, make_get_folder_by_id_1.makeGetFolderByIdUseCase)();
        const folder = await getFolderByIdUseCase.execute({
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
