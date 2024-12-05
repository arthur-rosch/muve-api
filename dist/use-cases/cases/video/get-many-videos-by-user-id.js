"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManyVideoByUserIdUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class GetManyVideoByUserIdUseCase {
    constructor(usersRepository, videoRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
    }
    async execute({ userId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const videos = await this.videoRepository.findManyByUserId(userId);
        return {
            videos,
        };
    }
}
exports.GetManyVideoByUserIdUseCase = GetManyVideoByUserIdUseCase;
