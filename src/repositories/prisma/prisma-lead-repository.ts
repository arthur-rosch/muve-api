import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { LeadsRepository } from '../lead-repository'

export class PrismaLeadsRepository implements LeadsRepository {
  async create(data: Prisma.LeadCreateInput) {
    const folder = await prisma.lead.create({
      data,
    })

    return folder
  }

  async findById(id: string) {
    const lead = await prisma.lead.findUnique({
      where: {
        id,
      },
    })

    if (!lead) {
      return null
    }

    return lead
  }

  async findByEmail(email: string) {
    const user = await prisma.lead.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async delete(id: string) {
    const lead = await prisma.lead.delete({
      where: {
        id,
      },
    })

    return lead
  }
}
