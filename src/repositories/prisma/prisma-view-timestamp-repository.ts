import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { ViewTimestampRepository } from '../view-timestamp-repository'

export class PrimasViewTimestampRepository implements ViewTimestampRepository {
  async findById(id: string) {
    const view = await prisma.viewTimestamp.findUnique({
      where: {
        id,
      },
    })

    if (!view) {
      return null
    }

    return view
  }

  async findManyByVideoAnalyticsId(videoAnalyticsId: string) {
    const views = await prisma.viewTimestamp.findMany({
      where: {
        videoAnalyticsId,
      },
    })

    return views
  }

  async create(data: Prisma.ViewTimestampCreateInput) {
    const view = await prisma.viewTimestamp.create({
      data,
    })

    return view
  }
}
