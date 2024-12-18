"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateLeadFormUseCase = makeCreateLeadFormUseCase;
const add_lead_1 = require("../../cases/video-form/add-lead");
const prisma_1 = require("../../../repositories/prisma");
function makeCreateLeadFormUseCase() {
    const videoLeadFormRepository = new prisma_1.PrismaVideoLeadFormRepository();
    const createLeadFormUseCase = new add_lead_1.CreateLeadFormUseCase(videoLeadFormRepository);
    return createLeadFormUseCase;
}
