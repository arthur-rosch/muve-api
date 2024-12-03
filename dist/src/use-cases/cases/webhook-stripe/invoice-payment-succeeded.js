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
exports.InvoicePaymentSucceededUseCase = void 0;
const lib_1 = require("@/lib");
const services_1 = require("@/services");
const erros_1 = require("@/use-cases/erros");
const templates_1 = require("@/templates");
const utils_1 = require("@/utils");
class InvoicePaymentSucceededUseCase {
    constructor(usersRepository, signatureRepository) {
        this.usersRepository = usersRepository;
        this.signatureRepository = signatureRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ subscriptionId, customerId, invoiceId, }) {
            const invoice = yield lib_1.stripe.invoices.retrieve(invoiceId);
            const subscription = yield lib_1.stripe.subscriptions.retrieve(subscriptionId);
            const user = yield this.usersRepository.findByCustomerId(String(subscription.customer));
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const lastSignature = yield this.signatureRepository.findLastByStripeSubscriptionId(subscriptionId);
            if (lastSignature) {
                yield this.signatureRepository.updateStatusSignature(lastSignature.id, subscription.status);
            }
            console.log(user.id);
            const newSignature = yield this.signatureRepository.create({
                plan: String(invoice.lines.data[0].plan.id),
                ChargeFrequency: 'MONTHLY',
                status: subscription.status,
                stripe_customer_id: customerId,
                price: String(invoice.amount_paid),
                stripe_subscription_id: subscriptionId,
                user: { connect: { id: user.id } },
                trial_end_date: (0, utils_1.formatTimestamp)(subscription.trial_end),
                end_date: (0, utils_1.formatTimestamp)(subscription.current_period_end),
                payment_method: String(subscription.default_payment_method),
                start_date: (0, utils_1.formatTimestamp)(subscription.current_period_start),
                next_charge_date: (0, utils_1.formatTimestamp)(subscription.current_period_end),
            });
            const plan = (0, utils_1.planNameMappingStripe)(newSignature.plan);
            const invoicePaymentSucceeded = (0, templates_1.InvoicePaymentSucceededEmail)({
                plan,
                name: user.name,
                price: (Number(newSignature.price) / 100).toFixed(2),
            });
            const subject = lastSignature
                ? 'Assinatura muve renovada!'
                : 'Assinatura muve paga com sucesso!';
            yield (0, services_1.sendEmail)({
                to: user.email,
                html: invoicePaymentSucceeded,
                from: 'contato@muveplayer.com',
                subject,
            });
            return { newSignature };
        });
    }
}
exports.InvoicePaymentSucceededUseCase = InvoicePaymentSucceededUseCase;
