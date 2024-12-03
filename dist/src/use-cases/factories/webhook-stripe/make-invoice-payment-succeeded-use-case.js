"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInvoicePaymentSucceededUseCase = makeInvoicePaymentSucceededUseCase;
const prisma_1 = require("@/repositories/prisma");
const invoice_payment_succeeded_1 = require("../../cases/webhook-stripe/invoice-payment-succeeded");
function makeInvoicePaymentSucceededUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const signaturesRepository = new prisma_1.PrismaSignaturesRepository();
    const invoicePaymentSucceededUseCase = new invoice_payment_succeeded_1.InvoicePaymentSucceededUseCase(usersRepository, signaturesRepository);
    return invoicePaymentSucceededUseCase;
}
