"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManySignatureByUserId = getManySignatureByUserId;
const erros_1 = require("../../../use-cases/erros");
const make_get_many_by_user_id_use_case_1 = require("../../../use-cases/factories/signature/make-get-many-by-user-id-use-case");
async function getManySignatureByUserId(request, reply) {
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const getManySignatureByUserIdUseCase = (0, make_get_many_by_user_id_use_case_1.makeGetManySignatureByUserIdUseCase)();
        const { signatures } = await getManySignatureByUserIdUseCase.execute({
            userId,
        });
        return reply.status(200).send(signatures);
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
