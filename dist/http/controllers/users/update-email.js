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
exports.updateEmail = updateEmail;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_update_email_use_case_1 = require("../../../use-cases/factories/user/make-update-email-use-case");
function updateEmail(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateEmailBodySchema = zod_1.z.object({
            email: zod_1.z.string().email(),
            newEmail: zod_1.z.string().email(),
            password: zod_1.z.string().min(6),
        });
        const { email, password, newEmail } = updateEmailBodySchema.parse(request.body);
        try {
            const updateEmailUseCase = (0, make_update_email_use_case_1.makeUpdateEmailUseCase)();
            const { user } = yield updateEmailUseCase.execute({
                email,
                newEmail,
                password,
            });
            user.password_hash = '';
            return reply.status(200).send({
                user,
            });
        }
        catch (err) {
            if (err instanceof erros_1.InvalidCredentialsError) {
                return reply.status(400).send({ message: err.message });
            }
            throw err;
        }
    });
}
