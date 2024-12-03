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
exports.DeleteFolderUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class DeleteFolderUseCase {
    constructor(usersRepository, folderRepository) {
        this.usersRepository = usersRepository;
        this.folderRepository = folderRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userId, folderId, }) {
            const user = yield this.usersRepository.findById(userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const folder = yield this.folderRepository.findById(folderId);
            if (!folder) {
                throw new erros_1.NotFoundErros('User');
            }
            if (folder.userId !== user.id) {
                throw new erros_1.AccessDeniedError('Folder');
            }
            const deletedFolder = yield this.folderRepository.delete(folderId);
            return {
                folder: deletedFolder,
            };
        });
    }
}
exports.DeleteFolderUseCase = DeleteFolderUseCase;
