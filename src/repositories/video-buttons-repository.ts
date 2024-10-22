import { Prisma, VideoButtons } from '@prisma/client'

export interface VideoButtonsRepository {
  findManyByVideoId(videoId: string): Promise<VideoButtons[] | null>
  deleteManyByVideoId(videoId: string): Promise<Prisma.BatchPayload>
  createMany(
    data: Prisma.VideoButtonsUncheckedCreateInput[],
  ): Promise<Prisma.BatchPayload>
}
