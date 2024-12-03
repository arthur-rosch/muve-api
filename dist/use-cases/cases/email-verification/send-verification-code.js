"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerificationCodeUseCase = void 0;
const env_1 = require("../../../env");
const services_1 = require("../../../services");
const utils_1 = require("../../../utils");
class SendVerificationCodeUseCase {
    constructor(emailVerificationRepository) {
        this.emailVerificationRepository = emailVerificationRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, }) {
            const code = (0, utils_1.generateVerificationCode)();
            let emailVerification;
            const existingVerification = yield this.emailVerificationRepository.findByEmail(email);
            if (existingVerification) {
                emailVerification = yield this.emailVerificationRepository.updateCode(email, code);
            }
            else {
                emailVerification = yield this.emailVerificationRepository.create(email, code);
            }
            yield (0, services_1.sendEmail)({
                to: email,
                from: env_1.env.USER_EMAIL,
                subject: 'Muve - Código de Verificação',
                text: `Seu código de verificação é: ${code}`,
                html: `<p>Seu código de verificação é: <strong>${code}</strong></p>`,
            });
            return {
                email: emailVerification,
            };
        });
    }
}
exports.SendVerificationCodeUseCase = SendVerificationCodeUseCase;
