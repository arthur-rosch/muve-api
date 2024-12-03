"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase = makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase;
const prisma_1 = require("@/repositories/prisma");
const process_signatures_two_days_before_trial_ends_1 = require("../../cases/signature/process-signatures-two-days-before-trial-ends");
function makeProcessSignaturesTwoDaysBeforeTrialEndsUseCase() {
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const processSignaturesTwoDaysBeforeTrialEndsUseCase = new process_signatures_two_days_before_trial_ends_1.ProcessSignaturesTwoDaysBeforeTrialEndsUseCase(signatureRepository);
    return processSignaturesTwoDaysBeforeTrialEndsUseCase;
}
