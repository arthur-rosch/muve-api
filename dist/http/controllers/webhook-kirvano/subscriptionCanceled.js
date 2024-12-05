"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionCanceled = subscriptionCanceled;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_subscription_canceled_use_case_1 = require("../../../use-cases/factories/webhook-kirvano/make-subscription-canceled-use-case");
async function subscriptionCanceled(request, reply) {
    const subscriptionCanceledEventSchema = zod_1.z.object({
        event: zod_1.z.string(),
        status: zod_1.z.string(),
        customer: zod_1.z.object({
            name: zod_1.z.string(),
            document: zod_1.z.string(),
            email: zod_1.z.string().email(),
            phone_number: zod_1.z.string(),
        }),
    });
    const { event, status, customer } = subscriptionCanceledEventSchema.parse(request.body);
    try {
        if (event === 'SUBSCRIPTION_CANCELED') {
            const subscriptionCanceledUseCase = (0, make_subscription_canceled_use_case_1.makeSubscriptionCanceledUseCase)();
            const { signature, user } = await subscriptionCanceledUseCase.execute({
                status,
                email: customer.email,
            });
            return reply.status(200).send({
                signature,
                user,
            });
        }
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
