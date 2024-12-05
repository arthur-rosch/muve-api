"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetManySignatureByUserIdUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class GetManySignatureByUserIdUseCase {
    constructor(usersRepository, signaturesRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
    }
    async execute({ userId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const signatures = await this.signaturesRepository.findManyByUserId(userId);
        return {
            signatures,
        };
    }
}
exports.GetManySignatureByUserIdUseCase = GetManySignatureByUserIdUseCase;
