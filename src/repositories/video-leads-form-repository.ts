import { LeadFormVideo, Prisma, VideoForm } from '@prisma/client';

export interface VideoLeadFormRepository {
  findManyByFormId(id: string): Promise<LeadFormVideo | null>;
  findManyByVideoId(id: string): Promise<LeadFormVideo | null>;

  delete(id: string): Promise<Prisma.BatchPayload>;
  create(
    data: Prisma.LeadFormVideoUncheckedCreateInput,
  ): Promise<LeadFormVideo>;
}
