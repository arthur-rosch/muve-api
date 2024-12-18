import { Prisma, VideoForm } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { VideoFormRepository } from '../video-form-repository';

export class PrismaVideoFormRepository implements VideoFormRepository {
  async findById(id: string): Promise<VideoForm | null> {
    const videoForm = await prisma.videoForm.findUnique({
      where: { id },
    });

    return videoForm;
  }

  async findByVideoId(videoId: string): Promise<VideoForm | null> {
    const videoForm = await prisma.videoForm.findFirst({
      where: { videoId },
    });

    return videoForm;
  }

  async deleteByVideoId(videoId: string): Promise<Prisma.BatchPayload> {
    const result = await prisma.videoForm.deleteMany({
      where: { videoId },
    });

    return result;
  }

  async create(data: Prisma.VideoFormUncheckedCreateInput): Promise<VideoForm> {
    const videoForm = await prisma.videoForm.create({
      data,
    });

    return videoForm;
  }

  async update(
    videoId: string,
    data: Prisma.VideoFormUncheckedUpdateInput,
  ): Promise<VideoForm> {
    const videoForm = await prisma.videoForm.update({
      where: { videoId },
      data,
    });

    return videoForm;
  }
}
