import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { VideoAnalyticsRepository } from '../video-analytics-repository'

export class PrimasVideoAnalyticsRepository
  implements VideoAnalyticsRepository
{
  async findById(id: string) {
    const video = await prisma.videoAnalytics.findUnique({
      where: {
        id,
      },
    })

    if (!video) {
      return null
    }

    return video
  }

  async findByVideoId(videoId: string) {
    const video = await prisma.videoAnalytics.findFirst({
      where: {
        videoId,
      },
      include: {
        viewTimestamps: true,
        viewUnique: true,
      },
    })

    if (!video) {
      return null
    }

    return video
  }

  async create(data: Prisma.VideoAnalyticsCreateInput) {
    const video = await prisma.videoAnalytics.create({
      data,
    })

    return video
  }

  async updateTotalPlays(id: string, totalPlays: number) {
    return prisma.videoAnalytics.update({
      where: { id },
      data: { totalPlays },
    })
  }

  async updateTotalViews(id: string, totalViews: number) {
    return prisma.videoAnalytics.update({
      where: { id },
      data: { totalViews },
    })
  }
}
