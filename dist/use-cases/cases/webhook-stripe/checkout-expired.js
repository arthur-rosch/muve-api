"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutExpiredUseCase = void 0;
const services_1 = require("../../../services");
const templates_1 = require("../../../templates");
class CheckoutExpiredUseCase {
    constructor(leadsRepository) {
        this.leadsRepository = leadsRepository;
    }
    async execute({ leadId, }) {
        const lead = await this.leadsRepository.findById(leadId);
        const checkoutExpired = (0, templates_1.CheckoutExpired)({
            name: lead.name,
            url: 'https://muveplayer.com/',
        });
        const status = await (0, services_1.sendEmail)({
            to: lead.email,
            html: checkoutExpired,
            from: 'contato@muveplayer.com',
            subject: 'Quase lá! Complete seu cadastro e comece a testar o Muve 🎥',
        });
        return { emailSend: !!status };
    }
}
exports.CheckoutExpiredUseCase = CheckoutExpiredUseCase;
