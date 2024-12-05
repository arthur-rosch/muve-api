"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyFoldersByUserIdUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class GetManyFoldersByUserIdUseCase {
    constructor(usersRepository, folderRepository) {
        this.usersRepository = usersRepository;
        this.folderRepository = folderRepository;
    }
    async execute({ userId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const folders = await this.folderRepository.findManyByUserId(userId);
        return {
            folders,
        };
    }
}
exports.GetManyFoldersByUserIdUseCase = GetManyFoldersByUserIdUseCase;
