import { LeadFormVideo } from '@prisma/client';
import { AccessDeniedError, NotFoundErros } from '../../erros';
import {
  UsersRepository,
  VideosRepository,
  VideoLeadFormRepository,
} from '../../../repositories';

interface GetAllLeadsFormsByVideoIdUseCaseRequest {
  videoId: string;
  userId: string;
}

interface GetAllLeadsFormsByVideoIdUseCaseResponse {
  leadFormVideos: LeadFormVideo[];
}

export class GetAllLeadsFormsByVideoIdUseCase {
  constructor(
    private userRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private videoLeadFormRepository: VideoLeadFormRepository,
  ) {}

  async execute({
    videoId,
    userId,
  }: GetAllLeadsFormsByVideoIdUseCaseRequest): Promise<GetAllLeadsFormsByVideoIdUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundErros('User');
    }

    const video = await this.videoRepository.findById(videoId);

    if (!video) {
      throw new NotFoundErros('User');
    }

    if (video.userId !== user.id) {
      throw new AccessDeniedError('Update video form');
    }

    const leadFormVideos = await this.videoLeadFormRepository.findManyByVideoId(
      videoId,
    );

    if (!leadFormVideos) {
      return { leadFormVideos: [] };
    }

    return {
      leadFormVideos: Array.isArray(leadFormVideos)
        ? leadFormVideos
        : [leadFormVideos],
    };
  }
}
