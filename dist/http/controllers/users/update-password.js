"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = updatePassword;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_update_password_use_case_1 = require("../../../use-cases/factories/user/make-update-password-use-case");
async function updatePassword(request, reply) {
    const updatePasswordBodySchema = zod_1.z.object({
        newPassword: zod_1.z.string().min(6),
        password: zod_1.z.string().min(6),
    });
    const userId = request.user?.sub;
    const { password, newPassword } = updatePasswordBodySchema.parse(request.body);
    try {
        const updatePasswordUseCase = (0, make_update_password_use_case_1.makeUpdatePasswordUseCase)();
        const { user } = await updatePasswordUseCase.execute({
            userId,
            password,
            newPassword,
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
