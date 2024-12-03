"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSendVerificationCodeUseCase = makeSendVerificationCodeUseCase;
const prisma_1 = require("../../../repositories/prisma");
const send_verification_code_1 = require("../../cases/email-verification/send-verification-code");
function makeSendVerificationCodeUseCase() {
    const emailVerificationRepository = new prisma_1.PrismaEmailVerificationRepository();
    const sendVerificationCodeUseCase = new send_verification_code_1.SendVerificationCodeUseCase(emailVerificationRepository);
    return sendVerificationCodeUseCase;
}
