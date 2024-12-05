"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessSignaturesTwoDaysAfterCreationUseCase = void 0;
const services_1 = require("../../../services");
const templates_1 = require("../../../templates");
class ProcessSignaturesTwoDaysAfterCreationUseCase {
    constructor(signaturesRepository) {
        this.signaturesRepository = signaturesRepository;
    }
    async execute() {
        const signatures = await this.signaturesRepository.getSignaturesTwoDaysAfterCreation();
        console.log(signatures);
        await Promise.all(signatures.map(async (signature) => {
            const onboardingHtml = (0, templates_1.OnboardingEmail)({
                name: signature.user.name,
            });
            await (0, services_1.sendEmail)({
                html: onboardingHtml,
                to: signature.user.email,
                from: 'contato@muveplayer.com',
                subject: 'Vamos explorar juntos? Comece agora com o Muve 🚀',
            });
        }));
        return { processedSignatures: signatures };
    }
}
exports.ProcessSignaturesTwoDaysAfterCreationUseCase = ProcessSignaturesTwoDaysAfterCreationUseCase;
