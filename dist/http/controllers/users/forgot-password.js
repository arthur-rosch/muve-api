"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = forgotPassword;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_forgot_password_use_case_1 = require("../../../use-cases/factories/user/make-forgot-password-use-case");
async function forgotPassword(request, reply) {
    const updatePasswordBodySchema = zod_1.z.object({
        newPassword: zod_1.z.string().min(6),
        confirmNewPassword: zod_1.z.string().min(6),
    });
    const userId = request.user?.sub;
    const { confirmNewPassword, newPassword } = updatePasswordBodySchema.parse(request.body);
    try {
        const forgotPasswordUseCase = (0, make_forgot_password_use_case_1.makeForgotPasswordUseCase)();
        const { user } = await forgotPasswordUseCase.execute({
            userId,
            newPassword,
            confirmNewPassword,
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
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(400).send({ message: err.message });
        }
        throw err;
    }
}
