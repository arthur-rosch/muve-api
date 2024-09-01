import { NotFoundErros } from '@/use-cases/erros'
import { VideoAnalytics, ViewTimestamp } from '@prisma/client'
import {
  UsersRepository,
  VideosRepository,
  VideoAnalyticsRepository,
  ViewTimestampRepository,
} from '@/repositories'

interface AddViewTimestampsUseCaseRequest {
  videoId: string
  userIp: string
  startTimestamp: number
  endTimestamp: number
  deviceType: string
  agent: string
  country: string
  region: string
  city: string
}

interface AddViewTimestampsUseCaseResponse {
  analytics: VideoAnalytics
  view: ViewTimestamp
}

export class AddViewTimestampsUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private videoAnalyticsRepository: VideoAnalyticsRepository,
    private viewTimestampRepository: ViewTimestampRepository,
  ) {}

  async execute({
    userIp,
    videoId,
    endTimestamp,
    startTimestamp,
    deviceType,
    agent,
    country,
    region,
    city,
  }: AddViewTimestampsUseCaseRequest): Promise<AddViewTimestampsUseCaseResponse> {
    const video = await this.videoRepository.findById(videoId)

    if (!video) {
      throw new NotFoundErros('Video')
    }

    const analytics = await this.videoAnalyticsRepository.findByVideoId(videoId)

    if (!analytics) {
      throw new NotFoundErros('Video Analytics')
    }

    const view = await this.viewTimestampRepository.create({
      endTimestamp,
      startTimestamp,
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
      await this.videoAnalyticsRepository.updateTotalPlays(
        analytics.id,
        analytics.totalPlays + 1,
      )

    return {
      analytics: updatedAnalytics,
      view,
    }
  }
}
