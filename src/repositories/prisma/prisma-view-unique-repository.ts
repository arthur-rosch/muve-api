import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { ViewUniqueRepository } from '../view-unique-repository'

export class PrimasViewUniqueRepository implements ViewUniqueRepository {
  async findById(id: string) {
    const view = await prisma.viewUnique.findUnique({
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
    const views = await prisma.viewUnique.findMany({
      where: {
        videoAnalyticsId,
      },
    })

    return views
  }

  async create(data: Prisma.ViewTimestampCreateInput) {
    const view = await prisma.viewUnique.create({
      data,
    })

    return view
  }
}
