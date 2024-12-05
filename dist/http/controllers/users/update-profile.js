"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = updateProfile;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_update_profile_use_case_1 = require("../../../use-cases/factories/user/make-update-profile-use-case");
async function updateProfile(request, reply) {
    const updateProfileBodySchema = zod_1.z.object({
        document: zod_1.z.string(),
        phone: zod_1.z.string(),
        name: zod_1.z.string(),
    });
    const userId = request.user?.sub;
    const { document, name, phone } = updateProfileBodySchema.parse(request.body);
    try {
        const updateProfileUseCase = (0, make_update_profile_use_case_1.makeUpdateProfileUseCase)();
        const { user } = await updateProfileUseCase.execute({
            document,
            name,
            phone,
            userId,
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
