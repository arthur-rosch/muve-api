"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProcessSignaturesAtHalfTrialUseCase = makeProcessSignaturesAtHalfTrialUseCase;
const prisma_1 = require("@/repositories/prisma");
const process_signatures_at_half_trial_1 = require("../../cases/signature/process-signatures-at-half-trial");
function makeProcessSignaturesAtHalfTrialUseCase() {
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const processSignaturesAtHalfTrialUseCase = new process_signatures_at_half_trial_1.ProcessSignaturesAtHalfTrialUseCase(signatureRepository);
    return processSignaturesAtHalfTrialUseCase;
}
