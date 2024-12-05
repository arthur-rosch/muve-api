"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionExpired = subscriptionExpired;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_subscription_expired_use_case_1 = require("../../../use-cases/factories/webhook-kirvano/make-subscription-expired-use-case");
async function subscriptionExpired(request, reply) {
    const subscriptionExpiredEventSchema = zod_1.z.object({
        event: zod_1.z.string(),
        status: zod_1.z.string(),
        customer: zod_1.z.object({
            name: zod_1.z.string(),
            document: zod_1.z.string(),
            email: zod_1.z.string().email(),
            phone_number: zod_1.z.string(),
        }),
    });
    const { event, status, customer } = subscriptionExpiredEventSchema.parse(request.body);
    try {
        if (event === 'SUBSCRIPTION_EXPIRED') {
            const subscriptionExpiredUseCase = (0, make_subscription_expired_use_case_1.makeSubscriptionExpiredUseCase)();
            console.log(customer.email);
            const { signature, user } = await subscriptionExpiredUseCase.execute({
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
