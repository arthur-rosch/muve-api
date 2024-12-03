"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = createFolder;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_create_folder_use_case_1 = require("../../../use-cases/factories/folder/make-create-folder-use-case");
function createFolder(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const createFolderBodySchema = zod_1.z.object({
            name: zod_1.z.string(),
            coverUrl: zod_1.z.string().optional(),
            videosId: zod_1.z.array(zod_1.z.string()).optional(),
        });
        const { name, coverUrl, videosId } = createFolderBodySchema.parse(request.body);
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
        if (!userId) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }
        try {
            const createFolderUseCase = (0, make_create_folder_use_case_1.makeCreateFolderUseCase)();
            const folder = yield createFolderUseCase.execute({
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
    });
}
