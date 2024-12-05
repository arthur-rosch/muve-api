"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVideoUseCase = void 0;
const utils_1 = require("../../../utils");
const erros_1 = require("../../../use-cases/erros");
class CreateVideoUseCase {
    constructor(usersRepository, videoRepository, folderRepository, chaptersRepository, videoAnalyticsRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
        this.folderRepository = folderRepository;
        this.chaptersRepository = chaptersRepository;
        this.videoAnalyticsRepository = videoAnalyticsRepository;
    }
    async execute({ url, name, type, userId, format, folderId, duration, chapters, colorProgress, fictitiousProgress, }) {
        let video;
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const thumbnail = (0, utils_1.getVideoThumbnail)(url);
        if (folderId) {
            const folder = await this.folderRepository.findById(folderId);
            if (!folder) {
                throw new erros_1.NotFoundErros('Folder');
            }
            if (type === 'Vsl') {
                video = await this.videoRepository.create({
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
                video = await this.videoRepository.create({
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
                await this.chaptersRepository.createMany(chaptersData);
            }
            await this.videoAnalyticsRepository.create({
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
                video = await this.videoRepository.create({
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
                video = await this.videoRepository.create({
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
                await this.chaptersRepository.createMany(chaptersData);
            }
            await this.videoAnalyticsRepository.create({
                video: {
                    connect: { id: video.id },
                },
            });
            return {
                video,
            };
        }
    }
}
exports.CreateVideoUseCase = CreateVideoUseCase;
