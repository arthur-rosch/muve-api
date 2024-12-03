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
exports.ProcessSignaturesTwoDaysAfterCreationUseCase = void 0;
const services_1 = require("@/services");
const templates_1 = require("@/templates");
class ProcessSignaturesTwoDaysAfterCreationUseCase {
    constructor(signaturesRepository) {
        this.signaturesRepository = signaturesRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const signatures = yield this.signaturesRepository.getSignaturesTwoDaysAfterCreation();
            console.log(signatures);
            yield Promise.all(signatures.map((signature) => __awaiter(this, void 0, void 0, function* () {
                const onboardingHtml = (0, templates_1.OnboardingEmail)({
                    name: signature.user.name,
                });
                yield (0, services_1.sendEmail)({
                    html: onboardingHtml,
                    to: signature.user.email,
                    from: 'contato@muveplayer.com',
                    subject: 'Vamos explorar juntos? Comece agora com o Muve 🚀',
                });
            })));
            return { processedSignatures: signatures };
        });
    }
}
exports.ProcessSignaturesTwoDaysAfterCreationUseCase = ProcessSignaturesTwoDaysAfterCreationUseCase;
