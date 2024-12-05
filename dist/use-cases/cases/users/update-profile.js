"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class UpdateProfileUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ document, name, phone, userId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const updatedUser = await this.usersRepository.update(userId, {
            document,
            name,
            phone,
        });
        return {
            user: updatedUser,
        };
    }
}
exports.UpdateProfileUseCase = UpdateProfileUseCase;
