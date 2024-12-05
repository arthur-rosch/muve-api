"use strict";
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
    async execute({ leadId, customerId, subscriptionId, }) {
        const lead = await this.leadsRepository.findById(leadId);
        if (!lead) {
            throw new erros_1.NotFoundErros('Lead');
        }
        let user;
        const userExist = await this.userRepository.findByEmail(lead.email);
        if (userExist) {
            user = await this.userRepository.update(user.id, {
                stripeCustomersId: customerId,
            });
        }
        else {
            const password_hash = await (0, bcryptjs_1.hash)(lead.document, 6);
            user = await this.userRepository.create({
                password_hash,
                name: lead.name,
                email: lead.email,
                phone: lead.phone,
                document: lead.document,
                stripeCustomersId: customerId,
            });
        }
        await this.leadsRepository.delete(lead.id);
        const purchaseEmail = (0, templates_1.PurchaseEmail)({
            name: user.name,
            password: user.document,
            login: user.email,
        });
        await (0, services_1.sendEmail)({
            to: user.email,
            html: purchaseEmail,
            from: 'contato@muveplayer.com',
            subject: 'Compra aprovada Muve Player',
        });
        return { user };
    }
}
exports.CheckoutCompletedUseCase = CheckoutCompletedUseCase;
