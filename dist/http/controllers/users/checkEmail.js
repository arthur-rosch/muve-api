"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = checkEmail;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_check_email_use_case_1 = require("../../../use-cases/factories/user/make-check-email-use-case");
async function checkEmail(request, reply) {
    const checkEmailBodySchema = zod_1.z.object({
        email: zod_1.z.string().email(),
    });
    const { email } = checkEmailBodySchema.parse(request.body);
    try {
        const checkEmailUseCase = (0, make_check_email_use_case_1.makeCheckEmailUseCase)();
        await checkEmailUseCase.execute({
            email,
        });
        return reply.status(200).send(true);
    }
    catch (err) {
        if (err instanceof erros_1.UserAlreadyExistsError) {
            return reply.status(400).send({ message: err.message });
        }
        throw err;
    }
}
