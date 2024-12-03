"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateLeadUseCase = makeCreateLeadUseCase;
const create_1 = require("../../cases/lead/create");
const prisma_1 = require("../../../repositories/prisma");
function makeCreateLeadUseCase() {
    const leadsRepository = new prisma_1.PrismaLeadsRepository();
    const createLeadUseCase = new create_1.CreateLeadUseCase(leadsRepository);
    return createLeadUseCase;
}
