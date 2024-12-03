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
exports.SubscriptionDeletedUseCase = void 0;
const lib_1 = require("../../../lib");
const services_1 = require("@/services");
const templates_1 = require("@/templates");
const erros_1 = require("@/use-cases/erros");
class SubscriptionDeletedUseCase {
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
            const updatedSignature = yield this.signatureRepository.updateStatusSignature(lastSignature.id, subscription.status);
            const user = yield this.usersRepository.findById(lastSignature.userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const cancellationEmail = (0, templates_1.UnsubscribeEmail)({
                name: user.name,
            });
            yield (0, services_1.sendEmail)({
                to: user.email,
                html: cancellationEmail,
                from: 'contato@muveplayer.com',
                subject: 'Assinatura Cancelada - Muve Player',
            });
            return { updatedSignature };
        });
    }
}
exports.SubscriptionDeletedUseCase = SubscriptionDeletedUseCase;
