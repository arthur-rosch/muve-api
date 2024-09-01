import { Prisma, Chapter } from '@prisma/client'

export interface ChaptersRepository {
  findManyByVideoId(videoId: string): Promise<Chapter[] | null>
  createMany(
    data: Prisma.ChapterUncheckedCreateInput[],
  ): Promise<Prisma.BatchPayload>
}
