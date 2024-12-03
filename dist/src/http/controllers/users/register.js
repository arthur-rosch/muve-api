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
exports.register = register;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_register_use_case_1 = require("@/use-cases/factories/user/make-register-use-case");
const make_send_verification_code_use_case_1 = require("@/use-cases/factories/email-verification/make-send-verification-code-use-case");
function register(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const registerBodySchema = zod_1.z.object({
            name: zod_1.z.string(),
            phone: zod_1.z.string(),
            document: zod_1.z.string(),
            password: zod_1.z.string(),
            email: zod_1.z.string().email(),
        });
        const { name, email, document, phone, password } = registerBodySchema.parse(request.body);
        try {
            const registerUseCase = (0, make_register_use_case_1.makeRegisterUseCase)();
            const sendVerificationCodeUseCase = (0, make_send_verification_code_use_case_1.makeSendVerificationCodeUseCase)();
            const { user } = yield registerUseCase.execute({
                name,
                email,
                phone,
                document,
                password,
            });
            if (user) {
                sendVerificationCodeUseCase.execute({
                    email: user.email,
                });
            }
            user.password_hash = '';
            return reply.status(201).send({ user });
        }
        catch (err) {
            if (err instanceof erros_1.UserAlreadyExistsError) {
                return reply.status(409).send({ message: err.message });
            }
            throw err;
        }
    });
}
