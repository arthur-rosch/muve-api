"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const zod_1 = require("zod");
const make_create_use_case_1 = require("../../../use-cases/factories/lead/make-create-use-case");
const erros_1 = require("../../../use-cases/erros");
async function create(request, reply) {
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
        const { checkoutUrl } = await createLeadUseCase.execute({
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
        if (err instanceof erros_1.UserAlreadyExistsError) {
            return reply.status(404).send({ message: err.message });
        }
        return reply.status(409).send({ message: err.message });
    }
}
