import { VideoAnalytics } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros'
import {
  UsersRepository,
  VideosRepository,
  VideoAnalyticsRepository,
} from '../../../repositories'

interface GetAnalyticsByVideoIdUseCaseRequest {
  userId: string
  videoId: string
}

interface GetAnalyticsByVideoIdUseCaseResponse {
  analytics: VideoAnalytics
}

export class GetAnalyticsByVideoIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private videoAnalyticsRepository: VideoAnalyticsRepository,
  ) {}

  async execute({
    userId,
    videoId,
  }: GetAnalyticsByVideoIdUseCaseRequest): Promise<GetAnalyticsByVideoIdUseCaseResponse> {
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
    console.log(videoId)
    const analytics = await this.videoAnalyticsRepository.findByVideoId(videoId)

    return {
      analytics,
    }
  }
}
