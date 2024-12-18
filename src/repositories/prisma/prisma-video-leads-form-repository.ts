import { prisma } from '../../lib/prisma';
import { LeadFormVideo, Prisma } from '@prisma/client';
import { VideoLeadFormRepository } from '../video-leads-form-repository';

export class PrismaVideoLeadFormRepository implements VideoLeadFormRepository {
  async findManyByFormId(id: string): Promise<LeadFormVideo | null> {
    const leadFormVideo = await prisma.leadFormVideo.findFirst({
      where: { videoFormId: id },
    });

    return leadFormVideo;
  }

  async findManyByVideoId(id: string): Promise<LeadFormVideo | null> {
    const leadFormVideo = await prisma.leadFormVideo.findFirst({
      where: { videoId: id },
    });

    return leadFormVideo;
  }

  async delete(id: string): Promise<Prisma.BatchPayload> {
    const result = await prisma.leadFormVideo.deleteMany({
      where: { id },
    });

    return result;
  }

  async create(
    data: Prisma.LeadFormVideoUncheckedCreateInput,
  ): Promise<LeadFormVideo> {
    const leadFormVideo = await prisma.leadFormVideo.create({
      data,
    });

    return leadFormVideo;
  }
}
