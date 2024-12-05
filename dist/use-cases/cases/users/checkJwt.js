"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckJwtUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class CheckJwtUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ userId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        return {
            user,
        };
    }
}
exports.CheckJwtUseCase = CheckJwtUseCase;
