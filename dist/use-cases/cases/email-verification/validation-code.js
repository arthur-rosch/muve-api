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
exports.ValidationCodeCodeUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class ValidationCodeCodeUseCase {
    constructor(emailVerificationRepository) {
        this.emailVerificationRepository = emailVerificationRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, code, }) {
            const verification = yield this.emailVerificationRepository.findByEmail(email);
            if (!verification || verification.code !== code) {
                throw new erros_1.InvalidVerificationCodeError();
            }
            const { isVerified } = yield this.emailVerificationRepository.updateVerificationStatus(email);
            return {
                status: isVerified,
            };
        });
    }
}
exports.ValidationCodeCodeUseCase = ValidationCodeCodeUseCase;
