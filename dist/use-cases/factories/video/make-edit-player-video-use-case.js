"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeEditPlayerVideo = makeEditPlayerVideo;
const edit_player_video_1 = require("../../cases/video/edit-player-video");
const prisma_1 = require("../../../repositories/prisma");
function makeEditPlayerVideo() {
    const usersRepository = new prisma_1.PrimasUsersRepository();
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const chaptersRepository = new prisma_1.PrismaChaptersRepository();
    const videoButtonsRepository = new prisma_1.PrismaVideoButtonsRepository();
    const editPlayerVideo = new edit_player_video_1.EditPlayerVideo(usersRepository, videoRepository, chaptersRepository, videoButtonsRepository);
    return editPlayerVideo;
}
