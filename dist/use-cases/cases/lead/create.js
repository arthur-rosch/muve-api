"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLeadUseCase = void 0;
const utils_1 = require("../../../utils");
const services_1 = require("../../../services");
const erros_1 = require("../../erros");
class CreateLeadUseCase {
    constructor(leadRepository, usersRepository) {
        this.leadRepository = leadRepository;
        this.usersRepository = usersRepository;
    }
    async execute({ plan, name, email, phone, document, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (user) {
            throw new erros_1.UserAlreadyExistsError();
        }
        const lead = await this.leadRepository.create({
            plan,
            name,
            email,
            phone,
            document,
        });
        const priceIdStripeProduct = (0, utils_1.planMappingStripe)(plan);
        const { url } = await (0, services_1.createStripeCheckout)({
            leadId: lead.id,
            email: lead.email,
            priceId: priceIdStripeProduct,
            success_url: `https://web.muveplayer.com/thanks`,
        });
        return { lead, checkoutUrl: url };
    }
}
exports.CreateLeadUseCase = CreateLeadUseCase;
