import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { ChaptersRepository } from '../chapter-repository'

export class PrismaChaptersRepository implements ChaptersRepository {
  async findManyByVideoId(videoId: string) {
    const chapters = await prisma.chapter.findMany({
      where: {
        videoId,
      },
    })

    return chapters
  }

  async deleteManyByVideoId(videoId: string) {
    const result = await prisma.$transaction(async (prisma) => {
      const chapter = await prisma.chapter.deleteMany({
        where: {
          videoId,
        },
      })

      return chapter
    })

    return result
  }

  async createMany(data: Prisma.ChapterUncheckedCreateInput[]) {
    const chapter = await prisma.chapter.createMany({
      data,
    })

    return chapter
  }
}
