import { Prisma, VideoAnalytics } from '@prisma/client'

export interface VideoAnalyticsRepository {
  findById(id: string): Promise<VideoAnalytics | null>
  findByVideoId(videoId: string): Promise<VideoAnalytics | null>
  create(data: Prisma.VideoAnalyticsCreateInput): Promise<VideoAnalytics>
  updateTotalPlays(id: string, totalPlays: number): Promise<VideoAnalytics>
  updateTotalViews(id: string, totalViews: number): Promise<VideoAnalytics>
}
