"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planMapping = void 0;
const planMapping = (planName) => {
    switch (planName) {
        case 'Mensal - Essencial':
            return 'ESSENTIAL';
        case 'Mensal - Profissional':
            return 'PROFESSIONAL';
        case 'Mensal - Ilimitado':
            return 'UNLIMITED';
        case 'Mensal -  Essencial':
            return 'ESSENTIAL';
        default:
            return undefined; // ou você pode lançar um erro ou retornar um valor padrão
    }
};
exports.planMapping = planMapping;
