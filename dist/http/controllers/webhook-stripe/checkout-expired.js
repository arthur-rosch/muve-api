"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkoutExpired = checkoutExpired;
const erros_1 = require("../../../use-cases/erros");
const make_checkout_expired_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-checkout-expired-use-case");
async function checkoutExpired(request, reply, object) {
    try {
        const checkoutExpiredUseCase = (0, make_checkout_expired_use_case_1.makeCheckoutExpiredUseCase)();
        const { emailSend } = await checkoutExpiredUseCase.execute({
            leadId: object.client_reference_id,
        });
        return reply.status(200).send({
            message: `Email send: ${emailSend}`,
        });
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
