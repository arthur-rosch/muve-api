"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmail = updateEmail;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_update_email_use_case_1 = require("../../../use-cases/factories/user/make-update-email-use-case");
async function updateEmail(request, reply) {
    const updateEmailBodySchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        newEmail: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    const { email, password, newEmail } = updateEmailBodySchema.parse(request.body);
    try {
        const updateEmailUseCase = (0, make_update_email_use_case_1.makeUpdateEmailUseCase)();
        const { user } = await updateEmailUseCase.execute({
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
}
