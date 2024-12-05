"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_authenticate_use_case_1 = require("../../../use-cases/factories/user/make-authenticate-use-case");
async function authenticate(request, reply) {
    const authenticateBodySchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    });
    const { email, password } = authenticateBodySchema.parse(request.body);
    try {
        const authenticateUseCase = (0, make_authenticate_use_case_1.makeAuthenticateUseCase)();
        const { user, signature } = await authenticateUseCase.execute({
            email,
            password,
        });
        const token = await reply.jwtSign({
            role: user.role,
        }, {
            sign: {
                sub: user.id,
                expiresIn: '7d',
            },
        });
        user.password_hash = '';
        return reply.status(200).send({
            user,
            token,
            signature,
        });
    }
    catch (err) {
        if (err instanceof erros_1.InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }
        if (err instanceof erros_1.SubscriptionCancelledError) {
            return reply.status(400).send({ message: err.message });
        }
        if (err instanceof erros_1.LateSubscriptionError) {
            return reply.status(400).send({ message: err.message });
        }
        if (err instanceof erros_1.SubscriptionPausedError) {
            return reply.status(400).send({ message: err.message });
        }
        if (err instanceof erros_1.EmailVerificationNotFoundError) {
            return reply.status(400).send({ message: err.message });
        }
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(400).send({ message: err.message });
        }
        throw err;
    }
}
