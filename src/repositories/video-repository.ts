import { Prisma, Video } from '@prisma/client'

export interface VideosRepository {
  findById(id: string): Promise<Video | null>
  findByPlayerId(id: string): Promise<Video | null>
  findByUserId(userId: string): Promise<Video | null>
  findManyByUserId(userId: string): Promise<Video[]>
  findManyByNotFolderId(id: string): Promise<Video[]>

  delete(id: string): Promise<Video>
  deleteAll(userId: string): Promise<Prisma.BatchPayload>
  create(data: Prisma.VideoCreateInput): Promise<Video>
  update(videoId: string, data: Prisma.VideoUpdateInput): Promise<Video>

  updateFolderId(videoId: string, folderId: string): Promise<Video>
}
