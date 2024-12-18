import { CreateLeadFormUseCase } from '../../cases/video-form/add-lead';
import { PrismaVideoLeadFormRepository } from '../../../repositories/prisma';

export function makeCreateLeadFormUseCase() {
  const videoLeadFormRepository = new PrismaVideoLeadFormRepository();

  const createLeadFormUseCase = new CreateLeadFormUseCase(
    videoLeadFormRepository,
  );

  return createLeadFormUseCase;
}
