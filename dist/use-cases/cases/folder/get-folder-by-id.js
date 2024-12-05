"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFolderByIdUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class GetFolderByIdUseCase {
    constructor(usersRepository, folderRepository) {
        this.usersRepository = usersRepository;
        this.folderRepository = folderRepository;
    }
    async execute({ userId, folderId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const folder = await this.folderRepository.findById(folderId);
        if (!folder) {
            throw new erros_1.NotFoundErros('Folder');
        }
        if (folder.userId !== user.id) {
            throw new erros_1.AccessDeniedError('Folder');
        }
        return {
            folder,
        };
    }
}
exports.GetFolderByIdUseCase = GetFolderByIdUseCase;
