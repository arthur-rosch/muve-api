import { GetAllLeadsFormsByVideoIdUseCase } from '../../cases/video-form/get-all-leads-by-video-id';
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaVideoLeadFormRepository,
} from '../../../repositories/prisma';

export function makeGetAllLeadsFormsByVideoIdUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const videoLeadFormRepository = new PrismaVideoLeadFormRepository();

  const getAllLeadsFormsByVideoIdUseCase = new GetAllLeadsFormsByVideoIdUseCase(
    usersRepository,
    videoRepository,
    videoLeadFormRepository,
  );

  return getAllLeadsFormsByVideoIdUseCase;
}
