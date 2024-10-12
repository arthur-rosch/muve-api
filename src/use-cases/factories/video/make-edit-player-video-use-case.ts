import { EditPlayerVideo } from '../../cases/video/edit-player-video'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaChaptersRepository,
  PrismaVideoButtonsRepository,
} from '@/repositories/prisma'

export function makeEditPlayerVideo() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const chaptersRepository = new PrismaChaptersRepository()
  const videoButtonsRepository = new PrismaVideoButtonsRepository()

  const editPlayerVideo = new EditPlayerVideo(
    usersRepository,
    videoRepository,
    chaptersRepository,
    videoButtonsRepository,
  )

  return editPlayerVideo
}
