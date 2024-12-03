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
exports.updateProfile = updateProfile;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros/");
const make_update_profile_use_case_1 = require("@/use-cases/factories/user/make-update-profile-use-case");
function updateProfile(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const updateProfileBodySchema = zod_1.z.object({
            document: zod_1.z.string(),
            phone: zod_1.z.string(),
            name: zod_1.z.string(),
        });
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
        const { document, name, phone } = updateProfileBodySchema.parse(request.body);
        try {
            const updateProfileUseCase = (0, make_update_profile_use_case_1.makeUpdateProfileUseCase)();
            const { user } = yield updateProfileUseCase.execute({
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
    });
}
