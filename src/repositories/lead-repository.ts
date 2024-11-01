import { Prisma, Lead } from '@prisma/client'

export interface LeadsRepository {
  findByEmail(email: string): Promise<Lead | null>
  findById(id: string): Promise<Lead | null>

  delete(id: string): Promise<Lead>
  create(data: Prisma.LeadCreateInput): Promise<Lead>
}
