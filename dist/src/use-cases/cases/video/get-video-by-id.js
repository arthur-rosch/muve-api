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
exports.GetVideoByIdUseCase = void 0;
const erros_1 = require("@/use-cases/erros");
class GetVideoByIdUseCase {
    constructor(userRepository, videoRepository, signatureRepository) {
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
        this.signatureRepository = signatureRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ videoId, }) {
            console.log(videoId);
            const video = yield this.videoRepository.findById(videoId);
            console.log(video);
            if (!video) {
                throw new erros_1.NotFoundErros('Video');
            }
            const user = yield this.userRepository.findById(video.userId);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const signature = yield this.signatureRepository.findByUserId(video.userId);
            if (!signature) {
                return { message: 'Usuário sem Plano' };
            }
            if (signature.status === 'canceled') {
                return { message: 'Assinatura cancelada.' };
            }
            if (signature.status === 'past_due') {
                return { message: 'Assinatura com pagamento atrasado.' };
            }
            if (signature.status === 'trialing') {
                const trialEndDate = signature.trial_end_date;
                if (trialEndDate && new Date(trialEndDate) < new Date()) {
                    return { message: 'Período de teste expirado.' };
                }
            }
            if (signature.status !== 'active' && signature.status !== 'trialing') {
                return { message: 'Assinatura inválida.' };
            }
            return { video };
        });
    }
}
exports.GetVideoByIdUseCase = GetVideoByIdUseCase;
