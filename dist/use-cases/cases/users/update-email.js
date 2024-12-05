"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmailUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("../../../use-cases/erros");
class UpdateEmailUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ email, newEmail, password, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new erros_1.InvalidCredentialsError();
        }
        const userNewEmail = await this.usersRepository.findByEmail(newEmail);
        if (userNewEmail) {
            throw new erros_1.InvalidCredentialsError();
        }
        const doestPasswordMatches = await (0, bcryptjs_1.compare)(password, user.password_hash);
        if (!doestPasswordMatches) {
            throw new erros_1.InvalidCredentialsError();
        }
        const newUser = await this.usersRepository.update(user.id, {
            ...user,
            email: newEmail,
        });
        return {
            user: newUser,
        };
    }
}
exports.UpdateEmailUseCase = UpdateEmailUseCase;
