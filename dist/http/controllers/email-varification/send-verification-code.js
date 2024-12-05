"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCode = sendVerificationCode;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_send_verification_code_use_case_1 = require("../../../use-cases/factories/email-verification/make-send-verification-code-use-case");
async function sendVerificationCode(request, reply) {
    const bodySchema = zod_1.z.object({ email: zod_1.z.string().email() });
    const { email } = bodySchema.parse(request.body);
    const emailVerificationUseCase = (0, make_send_verification_code_use_case_1.makeSendVerificationCodeUseCase)();
    try {
        const emailVerification = await emailVerificationUseCase.execute({
            email,
        });
        return reply.status(201).send(emailVerification);
    }
    catch (error) {
        if (error instanceof erros_1.InvalidVerificationCodeError) {
            return reply.status(409).send({ message: error.message });
        }
        return reply.status(400).send({ message: error.message });
    }
}
