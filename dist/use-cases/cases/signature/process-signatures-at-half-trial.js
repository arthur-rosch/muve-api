"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSignaturesAtHalfTrialUseCase = void 0;
const services_1 = require("../../../services");
const templates_1 = require("../../../templates");
class ProcessSignaturesAtHalfTrialUseCase {
    constructor(signaturesRepository) {
        this.signaturesRepository = signaturesRepository;
    }
    async execute() {
        const signatures = await this.signaturesRepository.getSignaturesAtHalfTrial();
        console.log(signatures);
        await Promise.all(signatures.map(async (signature) => {
            const onboardingHtml = (0, templates_1.HalfJourneyEmail)();
            await (0, services_1.sendEmail)({
                html: onboardingHtml,
                to: signature.user.email,
                from: 'contato@muveplayer.com',
                subject: 'Aproveite ao máximo o Muve! Descubra tudo que você pode fazer',
            });
        }));
        return { processedSignatures: signatures };
    }
}
exports.ProcessSignaturesAtHalfTrialUseCase = ProcessSignaturesAtHalfTrialUseCase;
