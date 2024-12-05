"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionDeletedUseCase = void 0;
const lib_1 = require("../../../lib");
const services_1 = require("../../../services");
const templates_1 = require("../../../templates");
const erros_1 = require("../../../use-cases/erros");
class SubscriptionDeletedUseCase {
    constructor(usersRepository, signatureRepository) {
        this.usersRepository = usersRepository;
        this.signatureRepository = signatureRepository;
    }
    async execute({ subscriptionId, }) {
        const subscription = await lib_1.stripe.subscriptions.retrieve(subscriptionId);
        const lastSignature = await this.signatureRepository.findLastByStripeSubscriptionId(subscriptionId);
        if (!lastSignature) {
            throw new erros_1.NotFoundErros('Last Signature');
        }
        const updatedSignature = await this.signatureRepository.updateStatusSignature(lastSignature.id, subscription.status);
        const user = await this.usersRepository.findById(lastSignature.userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const cancellationEmail = (0, templates_1.UnsubscribeEmail)({
            name: user.name,
        });
        await (0, services_1.sendEmail)({
            to: user.email,
            html: cancellationEmail,
            from: 'contato@muveplayer.com',
            subject: 'Assinatura Cancelada - Muve Player',
        });
        return { updatedSignature };
    }
}
exports.SubscriptionDeletedUseCase = SubscriptionDeletedUseCase;
