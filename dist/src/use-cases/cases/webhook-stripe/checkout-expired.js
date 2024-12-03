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
exports.CheckoutExpiredUseCase = void 0;
const services_1 = require("@/services");
const templates_1 = require("@/templates");
class CheckoutExpiredUseCase {
    constructor(leadsRepository) {
        this.leadsRepository = leadsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ leadId, }) {
            const lead = yield this.leadsRepository.findById(leadId);
            const checkoutExpired = (0, templates_1.CheckoutExpired)({
                name: lead.name,
                url: 'https://muveplayer.com/',
            });
            const status = yield (0, services_1.sendEmail)({
                to: lead.email,
                html: checkoutExpired,
                from: 'contato@muveplayer.com',
                subject: 'Quase lá! Complete seu cadastro e comece a testar o Muve 🎥',
            });
            return { emailSend: !!status };
        });
    }
}
exports.CheckoutExpiredUseCase = CheckoutExpiredUseCase;
