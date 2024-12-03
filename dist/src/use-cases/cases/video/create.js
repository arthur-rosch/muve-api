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
exports.CreateVideoUseCase = void 0;
const utils_1 = require("@/utils");
const erros_1 = require("@/use-cases/erros");
class CreateVideoUseCase {
    constructor(usersRepository, videoRepository, folderRepository, chaptersRepository, videoAnalyticsRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
        this.folderRepository = folderRepository;
        this.chaptersRepository = chaptersRepository;
        this.videoAnalyticsRepository = videoAnalyticsRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ url, name, type, userId, format, folderId, duration, chapters, colorProgress, fictitiousProgress, }) {
            let video;
            const user = yield this.usersRepository.findById(userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const thumbnail = (0, utils_1.getVideoThumbnail)(url);
            if (folderId) {
                const folder = yield this.folderRepository.findById(folderId);
                if (!folder) {
                    throw new erros_1.NotFoundErros('Folder');
                }
                if (type === 'Vsl') {
                    video = yield this.videoRepository.create({
                        url,
                        name,
                        type,
                        duration,
                        color: colorProgress,
                        fictitiousProgress,
                        format,
                        thumbnail,
                        tags: 'Teste',
                        folder: {
                            connect: { id: folderId },
                        },
                        user: {
                            connect: { id: userId },
                        },
                    });
                }
                else {
                    video = yield this.videoRepository.create({
                        url,
                        name,
                        type,
                        duration,
                        format,
                        thumbnail,
                        fullscreen: true,
                        playAndPause: true,
                        speed: true,
                        timeTraveled: true,
                        videoDuration: true,
                        volumeBar: true,
                        volumeButton: true,
                        tags: 'Teste',
                        folder: {
                            connect: { id: folderId },
                        },
                        user: {
                            connect: { id: userId },
                        },
                    });
                    const chaptersData = chapters.map((chapter) => ({
                        title: chapter.title,
                        startTime: chapter.startTime,
                        endTime: chapter.endTime,
                        videoId: video.id,
                    }));
                    yield this.chaptersRepository.createMany(chaptersData);
                }
                yield this.videoAnalyticsRepository.create({
                    video: {
                        connect: { id: video.id },
                    },
                });
                return {
                    video,
                };
            }
            else {
                if (type === 'Vsl') {
                    video = yield this.videoRepository.create({
                        url,
                        name,
                        type,
                        duration,
                        thumbnail,
                        color: colorProgress,
                        fictitiousProgress,
                        tags: 'Teste',
                        format,
                        user: {
                            connect: { id: userId },
                        },
                    });
                }
                else {
                    video = yield this.videoRepository.create({
                        url,
                        name,
                        type,
                        duration,
                        thumbnail,
                        format,
                        fullscreen: true,
                        playAndPause: true,
                        speed: true,
                        timeTraveled: true,
                        videoDuration: true,
                        volumeBar: true,
                        volumeButton: true,
                        tags: 'Teste',
                        user: {
                            connect: { id: userId },
                        },
                    });
                    const chaptersData = chapters.map((chapter) => ({
                        title: chapter.title,
                        startTime: chapter.startTime,
                        endTime: chapter.endTime,
                        videoId: video.id,
                    }));
                    yield this.chaptersRepository.createMany(chaptersData);
                }
                yield this.videoAnalyticsRepository.create({
                    video: {
                        connect: { id: video.id },
                    },
                });
                return {
                    video,
                };
            }
        });
    }
}
exports.CreateVideoUseCase = CreateVideoUseCase;
