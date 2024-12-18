import { LeadFormVideo, Prisma } from '@prisma/client';
import { VideoLeadFormRepository } from '../../../repositories';

interface CreateLeadFormUseCaseRequest {
  formId: string;
  videoId: string;
  data: {
    name?: string;
    phone?: string;
    email?: string;
  };
}

interface CreateLeadFormUseCaseResponse {
  leadFormVideo: LeadFormVideo;
}

export class CreateLeadFormUseCase {
  constructor(private videoLeadFormRepository: VideoLeadFormRepository) {}

  async execute({
    formId,
    videoId,
    data,
  }: CreateLeadFormUseCaseRequest): Promise<CreateLeadFormUseCaseResponse> {
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
