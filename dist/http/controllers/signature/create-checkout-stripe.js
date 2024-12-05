"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripeCheckout = createStripeCheckout;
const make_create_checkout_sessions_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-create-checkout-sessions-use-case");
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
async function createStripeCheckout(request, reply) {
    const createStripeBodySchema = zod_1.z.object({
        plan: zod_1.z.string(),
        email: zod_1.z.string().email(),
    });
    const { email, plan } = createStripeBodySchema.parse(request.body);
    try {
        const createStripeCheckoutUseCase = (0, make_create_checkout_sessions_use_case_1.makeCreateStripeCheckoutUseCase)();
        const { checkoutUrl } = await createStripeCheckoutUseCase.execute({
            email,
            plan,
        });
        return reply.status(200).send({ checkoutUrl });
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
