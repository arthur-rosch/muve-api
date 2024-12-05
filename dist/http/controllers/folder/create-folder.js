"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = createFolder;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_create_folder_use_case_1 = require("../../../use-cases/factories/folder/make-create-folder-use-case");
async function createFolder(request, reply) {
    const createFolderBodySchema = zod_1.z.object({
        name: zod_1.z.string(),
        coverUrl: zod_1.z.string().optional(),
        videosId: zod_1.z.array(zod_1.z.string()).optional(),
    });
    const { name, coverUrl, videosId } = createFolderBodySchema.parse(request.body);
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const createFolderUseCase = (0, make_create_folder_use_case_1.makeCreateFolderUseCase)();
        const folder = await createFolderUseCase.execute({
            name,
            userId,
            coverUrl,
            videosId,
        });
        return reply.status(201).send(folder);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
