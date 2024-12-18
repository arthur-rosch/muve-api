"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLeadFormUseCase = void 0;
class CreateLeadFormUseCase {
    constructor(videoLeadFormRepository) {
        this.videoLeadFormRepository = videoLeadFormRepository;
    }
    async execute({ formId, videoId, data, }) {
        const leadFormVideo = await this.videoLeadFormRepository.create({
            ...data,
            videoId,
            videoFormId: formId,
        });
        return {
            leadFormVideo,
        };
    }
}
exports.CreateLeadFormUseCase = CreateLeadFormUseCase;
