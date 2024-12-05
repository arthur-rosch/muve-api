"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSignaturesTwoDaysBeforeTrialEndsUseCase = void 0;
const services_1 = require("../../../services");
const templates_1 = require("../../../templates");
class ProcessSignaturesTwoDaysBeforeTrialEndsUseCase {
    constructor(signaturesRepository) {
        this.signaturesRepository = signaturesRepository;
    }
    async execute() {
        const signatures = await this.signaturesRepository.getSignaturesTwoDaysBeforeTrialEnds();
        await Promise.all(signatures.map(async (signature) => {
            const trialEndingSoonHtml = (0, templates_1.TrialEndingSoonEmail)({
                name: signature.user.name,
            });
            await (0, services_1.sendEmail)({
                html: trialEndingSoonHtml,
                to: signature.user.email,
                from: 'contato@muveplayer.com',
                subject: 'Faltam só 2 dias para o fim do seu trial! Aproveite ao máximo',
            });
        }));
        return { processedSignatures: signatures };
    }
}
exports.ProcessSignaturesTwoDaysBeforeTrialEndsUseCase = ProcessSignaturesTwoDaysBeforeTrialEndsUseCase;
