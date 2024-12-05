import { CreateLeadUseCase } from '../../cases/lead/create';
import {
  PrismaLeadsRepository,
  PrimasUsersRepository,
} from '../../../repositories/prisma';

export function makeCreateLeadUseCase() {
  const leadsRepository = new PrismaLeadsRepository();
  const usersRepository = new PrimasUsersRepository();

  const createLeadUseCase = new CreateLeadUseCase(
    leadsRepository,
    usersRepository,
  );

  return createLeadUseCase;
}
