"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInfoFirstAccessUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class AddInfoFirstAccessUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ userId, accountType, memberArea, videoHosting, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const newUser = await this.usersRepository.update(user.id, {
            ...user,
            accountType,
            memberArea,
            videoHosting,
        });
        return {
            user: newUser,
        };
    }
}
exports.AddInfoFirstAccessUseCase = AddInfoFirstAccessUseCase;
