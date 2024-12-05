"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutCompleted = checkoutCompleted;
const erros_1 = require("../../../use-cases/erros");
const make_checkout_completed_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-checkout-completed-use-case");
async function checkoutCompleted(request, reply, object) {
    try {
        const checkoutCompletedUseCase = (0, make_checkout_completed_use_case_1.makeCheckoutCompletedUseCase)();
        const { user } = await checkoutCompletedUseCase.execute({
            leadId: object.client_reference_id,
            customerId: String(object.customer),
            subscriptionId: String(object.subscription),
        });
        user.password_hash = '';
        return reply.status(200).send({
            user,
        });
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
