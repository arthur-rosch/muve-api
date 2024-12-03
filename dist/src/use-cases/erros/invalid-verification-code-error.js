"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidVerificationCodeError = void 0;
class InvalidVerificationCodeError extends Error {
    constructor() {
        super('Código inválido ou email não encontrado.');
        this.name = 'InvalidVerificationCodeError';
    }
}
exports.InvalidVerificationCodeError = InvalidVerificationCodeError;
