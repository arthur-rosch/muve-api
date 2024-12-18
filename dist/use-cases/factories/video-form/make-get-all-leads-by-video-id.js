"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetAllLeadsFormsByVideoIdUseCase = makeGetAllLeadsFormsByVideoIdUseCase;
const get_all_leads_by_video_id_1 = require("../../cases/video-form/get-all-leads-by-video-id");
const prisma_1 = require("../../../repositories/prisma");
function makeGetAllLeadsFormsByVideoIdUseCase() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const videoLeadFormRepository = new prisma_1.PrismaVideoLeadFormRepository();
    const getAllLeadsFormsByVideoIdUseCase = new get_all_leads_by_video_id_1.GetAllLeadsFormsByVideoIdUseCase(usersRepository, videoRepository, videoLeadFormRepository);
    return getAllLeadsFormsByVideoIdUseCase;
}
