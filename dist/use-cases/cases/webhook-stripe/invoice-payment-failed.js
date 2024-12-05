"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicePaymentFailedUseCase = void 0;
const lib_1 = require("../../../lib");
const services_1 = require("../../../services");
const erros_1 = require("../../../use-cases/erros");
const templates_1 = require("../../../templates");
const utils_1 = require("../../../utils");
class InvoicePaymentFailedUseCase {
    constructor(usersRepository, signatureRepository) {
        this.usersRepository = usersRepository;
        this.signatureRepository = signatureRepository;
    }
    async execute({ invoiceId, subscriptionId, }) {
        const subscription = await lib_1.stripe.subscriptions.retrieve(subscriptionId);
        const lastSignature = await this.signatureRepository.findLastByStripeSubscriptionId(subscriptionId);
        if (!lastSignature) {
            throw new erros_1.NotFoundErros('Last Signature');
        }
        const updatedSignature = await this.signatureRepository.update(lastSignature.id, {
            status: subscription.status,
            end_date: (0, utils_1.formatTimestamp)(subscription.current_period_end),
            payment_method: String(subscription.default_payment_method),
            start_date: (0, utils_1.formatTimestamp)(subscription.current_period_start),
            next_charge_date: (0, utils_1.formatTimestamp)(subscription.current_period_end),
        });
        const user = await this.usersRepository.findById(lastSignature.userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const plan = (0, utils_1.planNameMappingStripe)(updatedSignature.plan);
        const invoicePaymentFailed = (0, templates_1.InvoicePaymentFailedEmail)({
            plan,
            name: user.name,
            price: (Number(updatedSignature.price) / 100).toFixed(2),
        });
        await (0, services_1.sendEmail)({
            to: user.email,
            html: invoicePaymentFailed,
            from: 'contato@muveplayer.com',
            subject: 'Atenção: Houve um problema com o pagamento da sua assinatura',
        });
        return { updatedSignature };
    }
}
exports.InvoicePaymentFailedUseCase = InvoicePaymentFailedUseCase;
