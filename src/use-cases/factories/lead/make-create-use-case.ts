import { CreateLeadUseCase } from '../../cases/lead/create'
import { PrismaLeadsRepository } from '../../../repositories/prisma'

export function makeCreateLeadUseCase() {
  const leadsRepository = new PrismaLeadsRepository()

  const createLeadUseCase = new CreateLeadUseCase(leadsRepository)

  return createLeadUseCase
}
