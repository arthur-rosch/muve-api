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
exports.checkEmail = checkEmail;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros/");
const make_check_email_use_case_1 = require("../../../use-cases/factories/user/make-check-email-use-case");
function checkEmail(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkEmailBodySchema = zod_1.z.object({
            email: zod_1.z.string().email(),
        });
        const { email } = checkEmailBodySchema.parse(request.body);
        try {
            const checkEmailUseCase = (0, make_check_email_use_case_1.makeCheckEmailUseCase)();
            yield checkEmailUseCase.execute({
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
    });
}
