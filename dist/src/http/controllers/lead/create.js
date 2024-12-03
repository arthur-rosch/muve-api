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
exports.create = create;
const zod_1 = require("zod");
const make_create_use_case_1 = require("@/use-cases/factories/lead/make-create-use-case");
function create(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const createLeadBodySchema = zod_1.z.object({
            plan: zod_1.z.string(),
            name: zod_1.z.string(),
            phone: zod_1.z.string(),
            document: zod_1.z.string(),
            email: zod_1.z.string().email(),
        });
        console.log(request.body);
        const { name, email, plan, document, phone } = createLeadBodySchema.parse(request.body);
        try {
            const createLeadUseCase = (0, make_create_use_case_1.makeCreateLeadUseCase)();
            const { checkoutUrl } = yield createLeadUseCase.execute({
                plan,
                name,
                email,
                phone,
                document,
            });
            return reply.status(201).send({
                checkoutUrl,
            });
        }
        catch (err) {
            return reply.status(409).send({ message: err.message });
        }
    });
}
