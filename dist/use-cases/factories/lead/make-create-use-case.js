"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateLeadUseCase = makeCreateLeadUseCase;
const create_1 = require("../../cases/lead/create");
const prisma_1 = require("../../../repositories/prisma");
function makeCreateLeadUseCase() {
    const leadsRepository = new prisma_1.PrismaLeadsRepository();
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const createLeadUseCase = new create_1.CreateLeadUseCase(leadsRepository, usersRepository);
    return createLeadUseCase;
}
