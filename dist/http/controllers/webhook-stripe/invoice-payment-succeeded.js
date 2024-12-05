"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoicePaymentSucceeded = invoicePaymentSucceeded;
const erros_1 = require("../../../use-cases/erros");
const make_invoice_payment_succeeded_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-invoice-payment-succeeded-use-case");
async function invoicePaymentSucceeded(reply, request, object) {
    try {
        const invoicePaymentSucceededUseCase = (0, make_invoice_payment_succeeded_use_case_1.makeInvoicePaymentSucceededUseCase)();
        const { newSignature } = await invoicePaymentSucceededUseCase.execute({
            invoiceId: object.id,
            customerId: String(object.customer),
            subscriptionId: String(object.subscription),
        });
        return reply.status(200).send({
            newSignature,
        });
    }
    catch (err) {
        if (err instanceof erros_1.NotFoundErros) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
