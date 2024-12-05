"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const make_process_signatures_at_half_trial_use_case_1 = require("../../../use-cases/factories/signature/make-process-signatures-at-half-trial-use-case");
const make_process_signatures_two_days_after_creation_use_case_1 = require("../../../use-cases/factories/signature/make-process-signatures-two-days-after-creation-use-case");
const make_process_signatures_two_days_before_trial_ends_use_case_1 = require("../../../use-cases/factories/signature/make-process-signatures-two-days-before-trial-ends-use-case");
const processSignaturesAtHalfTrialUseCase = (0, make_process_signatures_at_half_trial_use_case_1.makeProcessSignaturesAtHalfTrialUseCase)();
const processSignaturesTwoDaysAfterCreationUseCase = (0, make_process_signatures_two_days_after_creation_use_case_1.makeProcessSignaturesTwoDaysAfterCreationUseCase)();
const processSignaturesTwoDaysBeforeTrialEndsUseCase = (0, make_process_signatures_two_days_before_trial_ends_use_case_1.makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase)();
node_cron_1.default.schedule('0 0 * * *', async () => {
    await processSignaturesTwoDaysAfterCreationUseCase.execute();
});
node_cron_1.default.schedule('0 0 * * *', async () => {
    await processSignaturesAtHalfTrialUseCase.execute();
});
node_cron_1.default.schedule('0 0 * * *', async () => {
    await processSignaturesTwoDaysBeforeTrialEndsUseCase.execute();
});
