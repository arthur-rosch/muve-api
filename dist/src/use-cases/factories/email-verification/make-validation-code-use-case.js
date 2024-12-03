"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeValidationCodeCodeUseCase = makeValidationCodeCodeUseCase;
const prisma_1 = require("@/repositories/prisma");
const validation_code_1 = require("../../cases/email-verification/validation-code");
function makeValidationCodeCodeUseCase() {
    const emailVerificationRepository = new prisma_1.PrismaEmailVerificationRepository();
    const validationCodeCodeUseCase = new validation_code_1.ValidationCodeCodeUseCase(emailVerificationRepository);
    return validationCodeCodeUseCase;
}
