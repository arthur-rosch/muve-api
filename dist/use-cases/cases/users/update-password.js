"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("../../../use-cases/erros");
class UpdatePasswordUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ userId, password, newPassword, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const doestPasswordMatches = await (0, bcryptjs_1.compare)(password, user.password_hash);
        if (!doestPasswordMatches) {
            throw new erros_1.InvalidCredentialsError();
        }
        const newPasswordHashed = await (0, bcryptjs_1.hash)(newPassword, 6);
        const newUser = await this.usersRepository.update(user.id, {
            ...user,
            password_hash: newPasswordHashed,
        });
        return {
            user: newUser,
        };
    }
}
exports.UpdatePasswordUseCase = UpdatePasswordUseCase;
