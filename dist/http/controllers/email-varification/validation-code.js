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
exports.validateVerificationCode = validateVerificationCode;
const zod_1 = require("zod");
const make_validation_code_use_case_1 = require("../../../use-cases/factories/email-verification/make-validation-code-use-case");
function validateVerificationCode(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodySchema = zod_1.z.object({ email: zod_1.z.string().email(), code: zod_1.z.string() });
        const { email, code } = bodySchema.parse(request.body);
        const validationCodeCodeUseCase = (0, make_validation_code_use_case_1.makeValidationCodeCodeUseCase)();
        try {
            const { status } = yield validationCodeCodeUseCase.execute({
                email,
                code,
            });
            return reply.status(200).send(status);
        }
        catch (error) {
            return reply.status(400).send({ message: error.message });
        }
    });
}
