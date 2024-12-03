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
exports.AddInfoFirstAccess = AddInfoFirstAccess;
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
const make_add_info_first_access_use_case_1 = require("@/use-cases/factories/user/make-add-info-first-access-use-case");
function AddInfoFirstAccess(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const addInfoFirstAccessBodySchema = zod_1.z.object({
            accountType: zod_1.z.string(),
            memberArea: zod_1.z.string(),
            videoHosting: zod_1.z.string(),
        });
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
        if (!userId) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }
        const { accountType, memberArea, videoHosting } = addInfoFirstAccessBodySchema.parse(request.body);
        try {
            const addInfoFirstAccessUseCase = (0, make_add_info_first_access_use_case_1.makeAddInfoFirstAccessUseCase)();
            yield addInfoFirstAccessUseCase.execute({
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
    });
}
