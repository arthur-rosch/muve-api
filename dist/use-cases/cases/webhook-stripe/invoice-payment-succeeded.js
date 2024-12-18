"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePaymentSucceededUseCase = void 0;
const lib_1 = require("../../../lib");
const services_1 = require("../../../services");
const erros_1 = require("../../../use-cases/erros");
const templates_1 = require("../../../templates");
const utils_1 = require("../../../utils");
class InvoicePaymentSucceededUseCase {
    constructor(usersRepository, signatureRepository) {
        this.usersRepository = usersRepository;
        this.signatureRepository = signatureRepository;
    }
    async execute({ subscriptionId, customerId, invoiceId, }) {
        const invoice = await lib_1.stripe.invoices.retrieve(invoiceId);
        const subscription = await lib_1.stripe.subscriptions.retrieve(subscriptionId);
        const user = await this.usersRepository.findByCustomerId(String(subscription.customer));
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const lastSignature = await this.signatureRepository.findLastByStripeSubscriptionId(subscriptionId);
        if (lastSignature) {
            await this.signatureRepository.updateStatusSignature(lastSignature.id, subscription.status.toLocaleLowerCase());
        }
        console.log(user.id);
        const newSignature = await this.signatureRepository.create({
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
        await (0, services_1.sendEmail)({
            to: user.email,
            html: invoicePaymentSucceeded,
            from: 'contato@muveplayer.com',
            subject,
        });
        return { newSignature };
    }
}
exports.InvoicePaymentSucceededUseCase = InvoicePaymentSucceededUseCase;
