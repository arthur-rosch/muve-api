import { EditPlayerVideo } from '../../cases/video/edit-player-video'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaChaptersRepository,
} from '@/repositories/prisma'

export function makeEditPlayerVideo() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const chaptersRepository = new PrismaChaptersRepository()

  const editPlayerVideo = new EditPlayerVideo(
    usersRepository,
    videoRepository,
    chaptersRepository,
  )

  return editPlayerVideo
}
