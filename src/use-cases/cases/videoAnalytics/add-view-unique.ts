import { NotFoundErros } from '@/use-cases/erros'
import { VideoAnalytics, ViewUnique } from '@prisma/client'
import {
  VideosRepository,
  VideoAnalyticsRepository,
  ViewUniqueRepository,
} from '@/repositories'

interface AddViewUniquesUseCaseRequest {
  videoId: string
  userIp: string
  deviceType: string
  agent: string
  country: string
  region: string
  city: string
}

interface AddViewUniquesUseCaseResponse {
  analytics: VideoAnalytics
  view: ViewUnique
}

export class AddViewUniquesUseCase {
  constructor(
    private videoRepository: VideosRepository,
    private viewUniqueRepository: ViewUniqueRepository,
    private videoAnalyticsRepository: VideoAnalyticsRepository,
  ) {}

  async execute({
    userIp,
    videoId,
    deviceType,
    agent,
    country,
    region,
    city,
  }: AddViewUniquesUseCaseRequest): Promise<AddViewUniquesUseCaseResponse> {
    const video = await this.videoRepository.findById(videoId)

    if (!video) {
      throw new NotFoundErros('Video')
    }

    const analytics = await this.videoAnalyticsRepository.findByVideoId(videoId)

    if (!analytics) {
      throw new NotFoundErros('Video Analytics')
    }

    const view = await this.viewUniqueRepository.create({
      videoAnalytics: {
        connect: { id: analytics.id },
      },
      userIp,
      deviceType,
      agent,
      country,
      region,
      city,
    })

    const updatedAnalytics =
      await this.videoAnalyticsRepository.updateTotalViews(
        analytics.id,
        analytics.totalViews + 1,
      )

    return {
      analytics: updatedAnalytics,
      view,
    }
  }
}
