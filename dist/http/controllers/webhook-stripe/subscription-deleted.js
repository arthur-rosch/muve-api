"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionDeleted = subscriptionDeleted;
const erros_1 = require("../../../use-cases/erros");
const make_subscription_deleted_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-subscription-deleted-use-case");
async function subscriptionDeleted(reply, request, object) {
    try {
        const subscriptionDeletedUseCase = (0, make_subscription_deleted_use_case_1.makeSubscriptionDeletedUseCase)();
        const { updatedSignature } = await subscriptionDeletedUseCase.execute({
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
