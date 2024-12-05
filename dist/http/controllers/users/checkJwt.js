"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = checkJwt;
const erros_1 = require("../../../use-cases/erros/");
const make_checkJwt_use_case_1 = require("../../../use-cases/factories/user/make-checkJwt-use-case");
async function checkJwt(request, reply) {
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const checkJwtUseCase = (0, make_checkJwt_use_case_1.makeCheckJwtUseCase)();
        const { user } = await checkJwtUseCase.execute({
            userId,
        });
        user.password_hash = '';
        return reply.status(200).send({
            user,
        });
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(400).send({ message: err.message });
        }
        throw err;
    }
}
