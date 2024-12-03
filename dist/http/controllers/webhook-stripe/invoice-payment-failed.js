"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoicePaymentFailed = invoicePaymentFailed;
const erros_1 = require("../../../use-cases/erros");
const make_invoice_payment_failed_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-invoice-payment-failed-use-case");
function invoicePaymentFailed(reply, request, object) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invoicePaymentFailedUseCase = (0, make_invoice_payment_failed_use_case_1.makeInvoicePaymentFailedUseCase)();
            const { updatedSignature } = yield invoicePaymentFailedUseCase.execute({
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
    });
}
