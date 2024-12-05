"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoicePaymentFailed = invoicePaymentFailed;
const erros_1 = require("../../../use-cases/erros");
const make_invoice_payment_failed_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-invoice-payment-failed-use-case");
async function invoicePaymentFailed(reply, request, object) {
    try {
        const invoicePaymentFailedUseCase = (0, make_invoice_payment_failed_use_case_1.makeInvoicePaymentFailedUseCase)();
        const { updatedSignature } = await invoicePaymentFailedUseCase.execute({
            invoiceId: object.id,
            subscriptionId: String(object.subscription),
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
