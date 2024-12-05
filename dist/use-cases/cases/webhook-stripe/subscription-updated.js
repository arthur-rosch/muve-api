"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionUpdatedUseCase = void 0;
const lib_1 = require("../../../lib");
const utils_1 = require("../../../utils");
const erros_1 = require("../../../use-cases/erros");
class SubscriptionUpdatedUseCase {
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
        const updatedSignature = await this.signatureRepository.update(lastSignature.id, {
            status: subscription.status,
            plan: subscription.items.data[0].price.id,
            end_date: new Date(subscription.current_period_end * 1000),
            start_date: new Date(subscription.current_period_start * 1000),
            next_charge_date: (0, utils_1.formatTimestamp)(subscription.current_period_end),
        });
        return { updatedSignature };
    }
}
exports.SubscriptionUpdatedUseCase = SubscriptionUpdatedUseCase;
