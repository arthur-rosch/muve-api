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
exports.SubscriptionUpdatedUseCase = void 0;
const lib_1 = require("../../../lib");
const utils_1 = require("@/utils");
const erros_1 = require("../../../use-cases/erros");
class SubscriptionUpdatedUseCase {
    constructor(usersRepository, signatureRepository) {
        this.usersRepository = usersRepository;
        this.signatureRepository = signatureRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ subscriptionId, }) {
            const subscription = yield lib_1.stripe.subscriptions.retrieve(subscriptionId);
            const lastSignature = yield this.signatureRepository.findLastByStripeSubscriptionId(subscriptionId);
            if (!lastSignature) {
                throw new erros_1.NotFoundErros('Last Signature');
            }
            const updatedSignature = yield this.signatureRepository.update(lastSignature.id, {
                status: subscription.status,
                plan: subscription.items.data[0].price.id,
                end_date: new Date(subscription.current_period_end * 1000),
                start_date: new Date(subscription.current_period_start * 1000),
                next_charge_date: (0, utils_1.formatTimestamp)(subscription.current_period_end),
            });
            return { updatedSignature };
        });
    }
}
exports.SubscriptionUpdatedUseCase = SubscriptionUpdatedUseCase;
