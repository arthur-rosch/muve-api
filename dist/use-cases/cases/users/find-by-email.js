"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByEmailUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class FindByEmailUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ email, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        return {
            user,
        };
    }
}
exports.FindByEmailUseCase = FindByEmailUseCase;
