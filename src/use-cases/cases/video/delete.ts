import { Video } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, VideosRepository } from '@/repositories'

interface DeleteVideoUseCaseRequest {
  userId: string
  videoId: string
}

interface DeleteVideoUseCaseResponse {
  deletedVideo: Video
}

export class DeleteVideoUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
  ) {}

  async execute({
    userId,
    videoId,
  }: DeleteVideoUseCaseRequest): Promise<DeleteVideoUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const video = await this.videoRepository.findById(videoId)

    if (!video) {
      throw new NotFoundErros('Video')
    }

    if (video.userId !== user.id) {
      throw new AccessDeniedError('Folder')
    }

    const deletedVideo = await this.videoRepository.delete(videoId)

    return {
      deletedVideo,
    }
  }
}
