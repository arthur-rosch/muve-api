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
exports.generatePasswordResetToken = generatePasswordResetToken;
const zod_1 = require("zod");
const send_email_1 = require("../../../services/send-email");
const templates_1 = require("../../../templates");
const make_find_ny_email_use_case_1 = require("../../../use-cases/factories/user/make-find-ny-email-use-case");
const erros_1 = require("../../../use-cases/erros");
function generatePasswordResetToken(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const resetTokenSchema = zod_1.z.object({
            email: zod_1.z.string().email(),
        });
        const { email } = resetTokenSchema.parse(request.body);
        try {
            const findByEmailUseCase = (0, make_find_ny_email_use_case_1.makeFindByEmailUseCase)();
            const { user } = yield findByEmailUseCase.execute({
                email,
            });
            const token = yield reply.jwtSign({
                role: user.role,
            }, {
                sign: {
                    sub: user.id,
                    expiresIn: '1d',
                },
            });
            const resetLink = `https://web.muveplayer.com/reset/password?token=${token}`;
            const emailContent = (0, templates_1.ResetPasswordEmail)({
                link: resetLink,
                name: user.name,
            });
            yield (0, send_email_1.sendEmail)({
                from: 'contato@muveplayer.com',
                to: email,
                subject: 'Redefinição de Senha Muve Player',
                html: emailContent,
            });
            return reply.status(200).send({
                message: 'Token de redefinição de senha enviado para o email.',
            });
        }
        catch (err) {
            if (err instanceof erros_1.NotFoundErros) {
                return reply.status(409).send({ message: err.message });
            }
            throw err;
        }
    });
}
