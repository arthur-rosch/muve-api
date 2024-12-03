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
exports.sendVerificationCode = sendVerificationCode;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_send_verification_code_use_case_1 = require("../../../use-cases/factories/email-verification/make-send-verification-code-use-case");
function sendVerificationCode(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const bodySchema = zod_1.z.object({ email: zod_1.z.string().email() });
        const { email } = bodySchema.parse(request.body);
        const emailVerificationUseCase = (0, make_send_verification_code_use_case_1.makeSendVerificationCodeUseCase)();
        try {
            const emailVerification = yield emailVerificationUseCase.execute({
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
    });
}
