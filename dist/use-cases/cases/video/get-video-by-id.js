"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVideoByIdUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class GetVideoByIdUseCase {
    constructor(userRepository, videoRepository, signatureRepository) {
        this.userRepository = userRepository;
        this.videoRepository = videoRepository;
        this.signatureRepository = signatureRepository;
    }
    async execute({ videoId, }) {
        console.log(videoId);
        const video = await this.videoRepository.findById(videoId);
        console.log(video);
        if (!video) {
            throw new erros_1.NotFoundErros('Video');
        }
        const user = await this.userRepository.findById(video.userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const signature = await this.signatureRepository.findByUserId(video.userId);
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
    }
}
exports.GetVideoByIdUseCase = GetVideoByIdUseCase;
