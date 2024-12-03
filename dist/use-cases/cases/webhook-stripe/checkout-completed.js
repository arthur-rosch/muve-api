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
exports.CheckoutCompletedUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const services_1 = require("../../../services");
const templates_1 = require("../../../templates");
const erros_1 = require("../../../use-cases/erros");
class CheckoutCompletedUseCase {
    constructor(leadsRepository, userRepository, signatureRepository) {
        this.leadsRepository = leadsRepository;
        this.userRepository = userRepository;
        this.signatureRepository = signatureRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ leadId, customerId, subscriptionId, }) {
            const lead = yield this.leadsRepository.findById(leadId);
            if (!lead) {
                throw new erros_1.NotFoundErros('Lead');
            }
            let user;
            const userExist = yield this.userRepository.findByEmail(lead.email);
            if (userExist) {
                user = yield this.userRepository.update(user.id, {
                    stripeCustomersId: customerId,
                });
            }
            else {
                const password_hash = yield (0, bcryptjs_1.hash)(lead.document, 6);
                user = yield this.userRepository.create({
                    password_hash,
                    name: lead.name,
                    email: lead.email,
                    phone: lead.phone,
                    document: lead.document,
                    stripeCustomersId: customerId,
                });
            }
            yield this.leadsRepository.delete(lead.id);
            const purchaseEmail = (0, templates_1.PurchaseEmail)({
                name: user.name,
                password: user.document,
                login: user.email,
            });
            yield (0, services_1.sendEmail)({
                to: user.email,
                html: purchaseEmail,
                from: 'contato@muveplayer.com',
                subject: 'Compra aprovada Muve Player',
            });
            return { user };
        });
    }
}
exports.CheckoutCompletedUseCase = CheckoutCompletedUseCase;
