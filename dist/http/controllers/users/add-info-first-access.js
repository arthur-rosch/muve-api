"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInfoFirstAccess = AddInfoFirstAccess;
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
const make_add_info_first_access_use_case_1 = require("../../../use-cases/factories/user/make-add-info-first-access-use-case");
async function AddInfoFirstAccess(request, reply) {
    const addInfoFirstAccessBodySchema = zod_1.z.object({
        accountType: zod_1.z.string(),
        memberArea: zod_1.z.string(),
        videoHosting: zod_1.z.string(),
    });
    const userId = request.user?.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Unauthorized' });
    }
    const { accountType, memberArea, videoHosting } = addInfoFirstAccessBodySchema.parse(request.body);
    try {
        const addInfoFirstAccessUseCase = (0, make_add_info_first_access_use_case_1.makeAddInfoFirstAccessUseCase)();
        await addInfoFirstAccessUseCase.execute({
            accountType,
            memberArea,
            videoHosting,
            userId,
        });
        return reply.status(200).send(true);
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.NotBeforeError) {
            return reply.status(400).send({ message: err.message });
        }
        throw err;
    }
}
