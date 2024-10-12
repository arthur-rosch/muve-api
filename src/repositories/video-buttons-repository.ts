import { Prisma, VideoButtons } from '@prisma/client'

export interface VideoButtonsRepository {
  findManyByVideoId(videoId: string): Promise<VideoButtons[] | null>
  createMany(
    data: Prisma.VideoButtonsUncheckedCreateInput[],
  ): Promise<Prisma.BatchPayload>
}
