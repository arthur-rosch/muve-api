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
exports.createVideo = createVideo;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_create_video_use_case_1 = require("../../../use-cases/factories/video/make-create-video-use-case");
function createVideo(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const chapterSchema = zod_1.z.object({
            title: zod_1.z.string().nonempty(),
            startTime: zod_1.z.string().nonempty(),
            endTime: zod_1.z.string().nonempty(),
        });
        const createVideoBodySchema = zod_1.z.object({
            url: zod_1.z.string(),
            type: zod_1.z.enum(['Vsl', 'Curso']),
            format: zod_1.z.enum(['9/16', '16/9']),
            name: zod_1.z.string(),
            duration: zod_1.z.string(),
            folderId: zod_1.z.string().optional(),
            colorProgress: zod_1.z.string().optional(),
            fictitiousProgress: zod_1.z.boolean().optional(),
            chapters: zod_1.z.array(chapterSchema).optional(),
        });
        const { url, name, type, format, folderId, duration, chapters, colorProgress, fictitiousProgress, } = createVideoBodySchema.parse(request.body);
        const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
        if (!userId) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }
        try {
            const createVideoUseCase = (0, make_create_video_use_case_1.makeCreateVideoUseCase)();
            const video = yield createVideoUseCase.execute({
                url,
                name,
                type,
                userId,
                format,
                folderId,
                duration,
                chapters,
                colorProgress,
                fictitiousProgress,
            });
            return reply.status(201).send(video);
        }
        catch (err) {
            if (err instanceof erros_1.NotFoundErros) {
                return reply.status(409).send({ message: err.message });
            }
            throw err;
        }
    });
}
