"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFolderUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class CreateFolderUseCase {
    constructor(usersRepository, folderRepository) {
        this.usersRepository = usersRepository;
        this.folderRepository = folderRepository;
    }
    async execute({ name, userId, coverUrl, videosId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const folder = await this.folderRepository.create({
            name,
            coverUrl,
            user: {
                connect: { id: userId },
            },
            videos: {
                connect: videosId?.map((videoId) => ({ id: videoId })) ?? [],
            },
        });
        return {
            folder,
        };
    }
}
exports.CreateFolderUseCase = CreateFolderUseCase;
