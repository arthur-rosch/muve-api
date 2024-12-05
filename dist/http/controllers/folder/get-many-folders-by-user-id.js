"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManyFolderByUserId = getManyFolderByUserId;
const erros_1 = require("../../../use-cases/erros");
const make_get_many_folders_by_user_id_1 = require("../../../use-cases/factories/folder/make-get-many-folders-by-user-id");
async function getManyFolderByUserId(request, reply) {
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const getManyFolderByUserIdUseCase = (0, make_get_many_folders_by_user_id_1.makeGetManyFoldersByUserIdUseCase)();
        const folders = await getManyFolderByUserIdUseCase.execute({
            userId,
        });
        console.log(folders);
        return reply.status(200).send(folders);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
