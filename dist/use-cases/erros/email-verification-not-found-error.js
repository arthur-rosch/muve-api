"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationNotFoundError = void 0;
class EmailVerificationNotFoundError extends Error {
    constructor() {
        super('Email verification not found or not verified.');
        this.name = 'EmailVerificationNotFoundError';
    }
}
exports.EmailVerificationNotFoundError = EmailVerificationNotFoundError;
