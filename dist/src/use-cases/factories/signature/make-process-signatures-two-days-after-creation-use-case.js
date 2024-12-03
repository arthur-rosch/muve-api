"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeProcessSignaturesTwoDaysAfterCreationUseCase = makeProcessSignaturesTwoDaysAfterCreationUseCase;
const prisma_1 = require("@/repositories/prisma");
const process_signatures_two_days_after_creation_1 = require("../../cases/signature/process-signatures-two-days-after-creation");
function makeProcessSignaturesTwoDaysAfterCreationUseCase() {
    const signatureRepository = new prisma_1.PrismaSignaturesRepository();
    const processSignaturesTwoDaysAfterCreationUseCase = new process_signatures_two_days_after_creation_1.ProcessSignaturesTwoDaysAfterCreationUseCase(signatureRepository);
    return processSignaturesTwoDaysAfterCreationUseCase;
}
