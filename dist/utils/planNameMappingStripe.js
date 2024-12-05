"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planNameMappingStripe = void 0;
const env_1 = require("../env");
const planNameMappingStripe = (priceId) => {
    switch (priceId) {
        case env_1.env.STRIPE_PRICE_ID_ESSENCIAL:
            return 'Mensal - Essencial';
        case env_1.env.STRIPE_PRICE_ID_PROFISSIONAL:
            return 'Mensal - Profissional';
        case env_1.env.STRIPE_PRICE_ID_ILIMITADO:
            return 'Mensal - Ilimitado';
        default:
            return 'Plano desconhecido';
    }
};
exports.planNameMappingStripe = planNameMappingStripe;
