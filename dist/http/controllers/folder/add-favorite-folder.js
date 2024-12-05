"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFavoriteFolder = addFavoriteFolder;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_add_favorite_folder_use_case_1 = require("../../../use-cases/factories/folder/make-add-favorite-folder-use-case");
async function addFavoriteFolder(request, reply) {
    const addFavoriteFolderBodySchema = zod_1.z.object({
        folderId: zod_1.z.string(),
        value: zod_1.z.boolean(),
    });
    const { folderId, value } = addFavoriteFolderBodySchema.parse(request.body);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const addFavoriteUseCase = (0, make_add_favorite_folder_use_case_1.makeAddFavoriteUseCase)();
        const folder = await addFavoriteUseCase.execute({
            userId,
            folderId,
            value,
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
