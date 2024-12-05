"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVideoByPlayerIdUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class GetVideoByPlayerIdUseCase {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    async execute({ videoPlayerId, }) {
        const video = await this.videoRepository.findByPlayerId(videoPlayerId);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        const { color, type, fictitiousProgress, url } = video;
        // youtubedl('url', {
        //   dumpSingleJson: true,
        //   noCheckCertificates: true,
        //   noWarnings: true,
        //   preferFreeFormats: true,
        //   format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        //   addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
        // }).then((output) => console.log(output))
        return {
            color,
            type,
            fictitiousProgress,
            url,
        };
    }
}
exports.GetVideoByPlayerIdUseCase = GetVideoByPlayerIdUseCase;
