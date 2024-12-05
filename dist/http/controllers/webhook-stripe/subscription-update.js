"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionUpdate = subscriptionUpdate;
const erros_1 = require("../../../use-cases/erros");
const make_subscription_updated_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-subscription-updated-use-case");
async function subscriptionUpdate(reply, request, object) {
    try {
        const subscriptionUpdatedUseCase = (0, make_subscription_updated_use_case_1.makeSubscriptionUpdatedUseCase)();
        const { updatedSignature } = await subscriptionUpdatedUseCase.execute({
            subscriptionId: object.id,
        });
        return reply.status(200).send({
            updatedSignature,
        });
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
