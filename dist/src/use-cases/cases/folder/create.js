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
exports.CreateFolderUseCase = void 0;
const erros_1 = require("@/use-cases/erros");
class CreateFolderUseCase {
    constructor(usersRepository, folderRepository) {
        this.usersRepository = usersRepository;
        this.folderRepository = folderRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, userId, coverUrl, videosId, }) {
            var _b;
            const user = yield this.usersRepository.findById(userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const folder = yield this.folderRepository.create({
                name,
                coverUrl,
                user: {
                    connect: { id: userId },
                },
                videos: {
                    connect: (_b = videosId === null || videosId === void 0 ? void 0 : videosId.map((videoId) => ({ id: videoId }))) !== null && _b !== void 0 ? _b : [],
                },
            });
            return {
                folder,
            };
        });
    }
}
exports.CreateFolderUseCase = CreateFolderUseCase;
