import { Prisma, ViewUnique } from '@prisma/client'

export interface ViewUniqueRepository {
  findById(id: string): Promise<ViewUnique | null>
  create(data: Prisma.ViewUniqueCreateInput): Promise<ViewUnique>
  findManyByVideoAnalyticsId(VideoAnalyticsId: string): Promise<ViewUnique[]>
}
