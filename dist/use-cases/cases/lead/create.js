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
exports.CreateLeadUseCase = void 0;
const utils_1 = require("../../../utils");
const services_1 = require("../../../services");
class CreateLeadUseCase {
    constructor(leadRepository) {
        this.leadRepository = leadRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ plan, name, email, phone, document, }) {
            const lead = yield this.leadRepository.create({
                plan,
                name,
                email,
                phone,
                document,
            });
            const priceIdStripeProduct = (0, utils_1.planMappingStripe)(plan);
            const { url } = yield (0, services_1.createStripeCheckout)({
                leadId: lead.id,
                email: lead.email,
                priceId: priceIdStripeProduct,
                success_url: `https://web.muveplayer.com/thanks`,
            });
            return { lead, checkoutUrl: url };
        });
    }
}
exports.CreateLeadUseCase = CreateLeadUseCase;
