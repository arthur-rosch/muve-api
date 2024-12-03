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
exports.addFavoriteFolder = addFavoriteFolder;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_add_favorite_folder_use_case_1 = require("@/use-cases/factories/folder/make-add-favorite-folder-use-case");
function addFavoriteFolder(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const addFavoriteFolderBodySchema = zod_1.z.object({
            folderId: zod_1.z.string(),
            value: zod_1.z.boolean(),
        });
        const { folderId, value } = addFavoriteFolderBodySchema.parse(request.body);
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
        if (!userId) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }
        try {
            const addFavoriteUseCase = (0, make_add_favorite_folder_use_case_1.makeAddFavoriteUseCase)();
            const folder = yield addFavoriteUseCase.execute({
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
    });
}
