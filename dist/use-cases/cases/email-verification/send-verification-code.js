"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerificationCodeUseCase = void 0;
const env_1 = require("../../../env");
const services_1 = require("../../../services");
const utils_1 = require("../../../utils");
class SendVerificationCodeUseCase {
    constructor(emailVerificationRepository) {
        this.emailVerificationRepository = emailVerificationRepository;
    }
    async execute({ email, }) {
        const code = (0, utils_1.generateVerificationCode)();
        let emailVerification;
        const existingVerification = await this.emailVerificationRepository.findByEmail(email);
        if (existingVerification) {
            emailVerification = await this.emailVerificationRepository.updateCode(email, code);
        }
        else {
            emailVerification = await this.emailVerificationRepository.create(email, code);
        }
        await (0, services_1.sendEmail)({
            to: email,
            from: env_1.env.USER_EMAIL,
            subject: 'Muve - Código de Verificação',
            text: `Seu código de verificação é: ${code}`,
            html: `<p>Seu código de verificação é: <strong>${code}</strong></p>`,
        });
        return {
            email: emailVerification,
        };
    }
}
exports.SendVerificationCodeUseCase = SendVerificationCodeUseCase;
