"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationCodeCodeUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class ValidationCodeCodeUseCase {
    constructor(emailVerificationRepository) {
        this.emailVerificationRepository = emailVerificationRepository;
    }
    async execute({ email, code, }) {
        const verification = await this.emailVerificationRepository.findByEmail(email);
        if (!verification || verification.code !== code) {
            throw new erros_1.InvalidVerificationCodeError();
        }
        const { isVerified } = await this.emailVerificationRepository.updateVerificationStatus(email);
        return {
            status: isVerified,
        };
    }
}
exports.ValidationCodeCodeUseCase = ValidationCodeCodeUseCase;
