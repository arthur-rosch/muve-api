import { NotFoundErros } from '../../../use-cases/erros'
import { VideoAnalytics } from '@prisma/client'
import {
  VideosRepository,
  VideoAnalyticsRepository,
} from '../../../repositories'

interface UpdateTotalViewsUseCaseRequest {
  videoId: string
}

interface UpdateTotalViewsUseCaseResponse {
  analytics: VideoAnalytics
}

export class UpdateTotalViewsUseCase {
  constructor(
    private videoRepository: VideosRepository,
    private videoAnalyticsRepository: VideoAnalyticsRepository,
  ) {}

  async execute({
    videoId,
  }: UpdateTotalViewsUseCaseRequest): Promise<UpdateTotalViewsUseCaseResponse> {
    const video = await this.videoRepository.findById(videoId)

    if (!video) {
      throw new NotFoundErros('Video')
    }

    const analytics = await this.videoAnalyticsRepository.findByVideoId(
      video.id,
    )

    if (!analytics) {
      throw new NotFoundErros('Video Analytics')
    }

    const totalViews = await this.videoAnalyticsRepository.updateTotalViews(
      analytics.id,
      analytics.totalViews + 1,
    )

    return {
      analytics: totalViews,
    }
  }
}
