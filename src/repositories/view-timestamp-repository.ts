import { Prisma, ViewTimestamp } from '@prisma/client'

export interface ViewTimestampRepository {
  findById(id: string): Promise<ViewTimestamp | null>
  create(data: Prisma.ViewTimestampCreateInput): Promise<ViewTimestamp>
  findManyByVideoAnalyticsId(VideoAnalyticsId: string): Promise<ViewTimestamp[]>
}
