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
exports.AddViewTimestampsUseCase = void 0;
const erros_1 = require("@/use-cases/erros");
class AddViewTimestampsUseCase {
    constructor(usersRepository, videoRepository, videoAnalyticsRepository, viewTimestampRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
        this.videoAnalyticsRepository = videoAnalyticsRepository;
        this.viewTimestampRepository = viewTimestampRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userIp, videoId, endTimestamp, startTimestamp, deviceType, agent, country, region, city, }) {
            const video = yield this.videoRepository.findById(videoId);
            if (!video) {
                throw new erros_1.NotFoundErros('Video');
            }
            const analytics = yield this.videoAnalyticsRepository.findByVideoId(videoId);
            if (!analytics) {
                throw new erros_1.NotFoundErros('Video Analytics');
            }
            const view = yield this.viewTimestampRepository.create({
                endTimestamp,
                startTimestamp,
                videoAnalytics: {
                    connect: { id: analytics.id },
                },
                userIp,
                deviceType,
                agent,
                country,
                region,
                city,
            });
            const updatedAnalytics = yield this.videoAnalyticsRepository.updateTotalPlays(analytics.id, analytics.totalPlays + 1);
            return {
                analytics: updatedAnalytics,
                view,
            };
        });
    }
}
exports.AddViewTimestampsUseCase = AddViewTimestampsUseCase;
