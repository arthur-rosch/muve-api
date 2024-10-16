import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { VideoButtonsRepository } from '../video-buttons-repository'

export class PrismaVideoButtonsRepository implements VideoButtonsRepository {
  async findManyByVideoId(videoId: string) {
    const videoButtons = await prisma.videoButtons.findMany({
      where: {
        videoId,
      },
    })

    return videoButtons
  }

  async deleteManyByVideoId(videoId: string) {
    const result = await prisma.$transaction(async (prisma) => {
      const videoButtons = await prisma.videoButtons.deleteMany({
        where: {
          videoId,
        },
      })

      return videoButtons
    })

    return result
  }

  async createMany(data: Prisma.VideoButtonsUncheckedCreateInput[]) {
    const videoButtons = await prisma.videoButtons.createMany({
      data,
    })

    return videoButtons
  }
}
