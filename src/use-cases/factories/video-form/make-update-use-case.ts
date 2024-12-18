import { UpdateVideoFormUseCase } from '../../cases/video-form/update';
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaVideoFormRepository,
} from '../../../repositories/prisma';

export function makeUpdateVideoFormUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const videoRepository = new PrimasVideosRepository();
  const videoFormRepository = new PrismaVideoFormRepository();

  const updateVideoFormUseCase = new UpdateVideoFormUseCase(
    usersRepository,
    videoRepository,
    videoFormRepository,
  );

  return updateVideoFormUseCase;
}
