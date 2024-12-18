import { Prisma, VideoForm } from '@prisma/client';

export interface VideoFormRepository {
  findById(id: string): Promise<VideoForm | null>;
  findByVideoId(videoId: string): Promise<VideoForm | null>;

  deleteByVideoId(videoId: string): Promise<Prisma.BatchPayload>;
  create(data: Prisma.VideoFormUncheckedCreateInput): Promise<VideoForm>;

  update(
    videoId: string,
    data: Prisma.VideoFormUncheckedUpdateInput,
  ): Promise<VideoForm>;
}
