import { Prisma, VideoForm } from '@prisma/client';
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros';
import {
  UsersRepository,
  VideoFormRepository,
  VideosRepository,
} from '../../../repositories';
import { boolean } from 'zod';

interface UpdateVideoFormUseCaseRequest {
  videoId: string;
  userId: string;
  data: Prisma.VideoFormUncheckedUpdateInput;
}

interface UpdateVideoFormUseCaseResponse {
  videoForm: VideoForm;
}

export class UpdateVideoFormUseCase {
  constructor(
    private userRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private videoFormRepository: VideoFormRepository,
  ) {}

  async execute({
    videoId,
    userId,
    data,
  }: UpdateVideoFormUseCaseRequest): Promise<UpdateVideoFormUseCaseResponse> {
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

    const existingVideoForm = await this.videoFormRepository.findByVideoId(
      videoId,
    );

    if (!existingVideoForm) {
      const createdVideoForm = await this.videoFormRepository.create({
        videoId: videoId,
        showIn: data.showIn as string,
        isActive: data.isActive as boolean,
        inputName: data.inputName as boolean,
        inputEmail: data.inputEmail as boolean,
        inputPhone: data.inputPhone as boolean,
      });

      return {
        videoForm: createdVideoForm,
      };
    }

    const updatedVideoForm = await this.videoFormRepository.update(
      videoId,
      data,
    );

    return {
      videoForm: updatedVideoForm,
    };
  }
}
