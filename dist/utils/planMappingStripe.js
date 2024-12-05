"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planMappingStripe = void 0;
const env_1 = require("../env");
const planMappingStripe = (planName) => {
    switch (planName) {
        case 'Mensal - Essencial':
            return env_1.env.STRIPE_PRICE_ID_ESSENCIAL;
        case 'Mensal - Profissional':
            return env_1.env.STRIPE_PRICE_ID_PROFISSIONAL;
        case 'Mensal - Ilimitado':
            return env_1.env.STRIPE_PRICE_ID_ILIMITADO;
        default:
            return env_1.env.STRIPE_PRICE_ID_ESSENCIAL;
    }
};
exports.planMappingStripe = planMappingStripe;
