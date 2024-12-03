"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVideoByPlayerIdUseCase = void 0;
const erros_1 = require("@/use-cases/erros");
class GetVideoByPlayerIdUseCase {
    constructor(videoRepository) {
        this.videoRepository = videoRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ videoPlayerId, }) {
            const video = yield this.videoRepository.findByPlayerId(videoPlayerId);
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
        });
    }
}
exports.GetVideoByPlayerIdUseCase = GetVideoByPlayerIdUseCase;
