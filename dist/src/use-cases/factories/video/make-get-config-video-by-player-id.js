"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGetVideoByPlayerIdUseCase = makeGetVideoByPlayerIdUseCase;
const get_config_video_by_player_id_1 = require("../../cases/video/get-config-video-by-player-id");
const prisma_1 = require("@/repositories/prisma");
function makeGetVideoByPlayerIdUseCase() {
    const videoRepository = new prisma_1.PrimasVideosRepository();
    const getVideoByPlayerIdUseCase = new get_config_video_by_player_id_1.GetVideoByPlayerIdUseCase(videoRepository);
    return getVideoByPlayerIdUseCase;
}
