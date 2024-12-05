"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateVerificationCode = validateVerificationCode;
const zod_1 = require("zod");
const make_validation_code_use_case_1 = require("../../../use-cases/factories/email-verification/make-validation-code-use-case");
async function validateVerificationCode(request, reply) {
    const bodySchema = zod_1.z.object({ email: zod_1.z.string().email(), code: zod_1.z.string() });
    const { email, code } = bodySchema.parse(request.body);
    const validationCodeCodeUseCase = (0, make_validation_code_use_case_1.makeValidationCodeCodeUseCase)();
    try {
        const { status } = await validationCodeCodeUseCase.execute({
            email,
            code,
        });
        return reply.status(200).send(status);
    }
    catch (error) {
        return reply.status(400).send({ message: error.message });
    }
}
