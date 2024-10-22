import { Prisma, Chapter } from '@prisma/client'

export interface ChaptersRepository {
  findManyByVideoId(videoId: string): Promise<Chapter[] | null>
  deleteManyByVideoId(videoId: string): Promise<Prisma.BatchPayload>
  createMany(
    data: Prisma.ChapterUncheckedCreateInput[],
  ): Promise<Prisma.BatchPayload>
}
