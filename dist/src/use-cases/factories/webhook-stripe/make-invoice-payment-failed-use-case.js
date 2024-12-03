"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInvoicePaymentFailedUseCase = makeInvoicePaymentFailedUseCase;
const prisma_1 = require("@/repositories/prisma");
const invoice_payment_failed_1 = require("../../cases/webhook-stripe/invoice-payment-failed");
function makeInvoicePaymentFailedUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signaturesRepository = new prisma_1.PrismaSignaturesRepository();
    const invoicePaymentFailedUseCase = new invoice_payment_failed_1.InvoicePaymentFailedUseCase(usersRepository, signaturesRepository);
    return invoicePaymentFailedUseCase;
}
