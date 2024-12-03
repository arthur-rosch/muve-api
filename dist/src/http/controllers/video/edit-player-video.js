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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPlayerVideo = editPlayerVideo;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_edit_player_video_use_case_1 = require("@/use-cases/factories/video/make-edit-player-video-use-case");
function editPlayerVideo(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const buttonSchema = zod_1.z.object({
            buttonType: zod_1.z.enum(['below', 'inside']),
            buttonText: zod_1.z.string().nonempty(),
            buttonSize: zod_1.z.string().nonempty(),
            buttonLink: zod_1.z.string().url().nonempty(),
            startTime: zod_1.z.string().nonempty(),
            endTime: zod_1.z.string().nonempty(),
            buttonAfterTheVideoEnds: zod_1.z.boolean().optional(),
            backgroundColor: zod_1.z.string().nonempty(),
            textColor: zod_1.z.string().nonempty(),
            hoverBackgroundColor: zod_1.z.string().nonempty(),
            hoverTextColor: zod_1.z.string().nonempty(),
            buttonPosition: zod_1.z.string().nullable().optional(),
        });
        const chapterSchema = zod_1.z.object({
            title: zod_1.z.string().nonempty(),
            startTime: zod_1.z.string().nonempty(),
            endTime: zod_1.z.string().nonempty(),
        });
        const editPlayerParamsSchema = zod_1.z.object({
            videoId: zod_1.z.string(),
        });
        const editPlayerVideoBodySchema = zod_1.z.object({
            name: zod_1.z.string().optional(),
            format: zod_1.z.enum(['9/16', '16/9']).optional(),
            thumbnail: zod_1.z.string().optional(),
            color: zod_1.z.string().optional(),
            colorSmartPlayers: zod_1.z.string().optional(),
            playAndPause: zod_1.z.boolean().optional(),
            progressBar: zod_1.z.boolean().optional(),
            timeTraveled: zod_1.z.boolean().optional(),
            videoDuration: zod_1.z.boolean().optional(),
            volumeButton: zod_1.z.boolean().optional(),
            volumeBar: zod_1.z.boolean().optional(),
            speed: zod_1.z.boolean().optional(),
            fullscreen: zod_1.z.boolean().optional(),
            smartAutoPlay: zod_1.z.boolean().optional(),
            UrlCoverSmartAutoPlay: zod_1.z.string().optional(),
            TextTopSmartAutoPlay: zod_1.z.string().optional(),
            TextButtonSmartAutoPlay: zod_1.z.string().optional(),
            continueWatching: zod_1.z.boolean().optional(),
            watchingNow: zod_1.z.boolean().optional(),
            watchingNowFontSize: zod_1.z.string().optional(),
            watchingNowBgColor: zod_1.z.string().optional(),
            watchingNowTextColor: zod_1.z.string().optional(),
            ImageVideoPause: zod_1.z.boolean().optional(),
            UrlCoverImageVideoPause: zod_1.z.string().optional(),
            ImageOfFinished: zod_1.z.boolean().optional(),
            UrlCoverImageOfFinished: zod_1.z.string().optional(),
            chapterMenu: zod_1.z.boolean().optional(),
            buttonsActive: zod_1.z.boolean().optional(),
            Chapter: zod_1.z.array(chapterSchema).optional(),
            VideoButtons: zod_1.z.array(buttonSchema).optional(),
            fictitiousProgressHeight: zod_1.z.string().optional(),
            fictitiousProgress: zod_1.z.boolean().optional(),
        });
        const data = editPlayerVideoBodySchema.parse(request.body);
        const { videoId } = editPlayerParamsSchema.parse(request.params);
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
        if (!userId) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }
        try {
            const editPlayerVideoUseCase = (0, make_edit_player_video_use_case_1.makeEditPlayerVideo)();
            const { Chapter, VideoButtons } = data, dataEdit = __rest(data, ["Chapter", "VideoButtons"]);
            const video = yield editPlayerVideoUseCase.execute({
                videoId,
                userId,
                dataEdit,
                Chapters: Chapter,
                Buttons: VideoButtons,
            });
            return reply.status(200).send(video);
        }
        catch (err) {
            if (err instanceof erros_1.NotFoundErros) {
                return reply.status(409).send({ message: err.message });
            }
            if (err instanceof erros_1.AccessDeniedError) {
                return reply.status(409).send({ message: err.message });
            }
            throw err;
        }
    });
}
