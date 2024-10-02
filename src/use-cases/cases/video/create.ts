import { Video } from '@prisma/client'
import { getVideoThumbnail } from '@/utils'
import { NotFoundErros } from '@/use-cases/erros'
import {
  UsersRepository,
  VideosRepository,
  FoldersRepository,
  ChaptersRepository,
  VideoAnalyticsRepository,
} from '@/repositories'
import { ActiveNotificationError } from '@/use-cases/erros/video-notification-flag-exists-error'

interface CreateVideoUseCaseRequest {
  url: string
  name: string
  userId: string
  duration: string
  folderId?: string
  type: 'Vsl' | 'Curso'
  format: '9/16' | '16/9'
  receiveNotification: boolean
  colorProgress?: string
  chapters?: {
    title?: string
    startTime?: string
    endTime?: string
  }[]
  fictitiousProgress?: boolean
}

interface CreateVideoUseCaseResponse {
  video: Video
}

export class CreateVideoUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private folderRepository: FoldersRepository,
    private chaptersRepository: ChaptersRepository,
    private videoAnalyticsRepository: VideoAnalyticsRepository,
  ) {}

  async execute({
    url,
    name,
    type,
    userId,
    format,
    folderId,
    duration,
    chapters,
    colorProgress,
    fictitiousProgress,
    receiveNotification
  }: CreateVideoUseCaseRequest): Promise<CreateVideoUseCaseResponse> {
    let video
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const videosWithNotificationsFlag = await this.videoRepository.findVideoWithNotificationFlag()

    if(videosWithNotificationsFlag){
      throw new ActiveNotificationError()
    }

    const thumbnail = getVideoThumbnail(url)

    if (folderId) {
      const folder = await this.folderRepository.findById(folderId)

      if (!folder) {
        throw new NotFoundErros('Folder')
      }

      if (type === 'Vsl') {
        video = await this.videoRepository.create({
          url,
          name,
          type,
          duration,
          color: colorProgress,
          fictitiousProgress,
          receiveNotification,
          format,
          thumbnail,
          tags: 'Teste',
          folder: {
            connect: { id: folderId },
          },
          user: {
            connect: { id: userId },
          },
        })
      } else {
        video = await this.videoRepository.create({
          url,
          name,
          type,
          duration,
          format,
          thumbnail,
          tags: 'Teste',
          folder: {
            connect: { id: folderId },
          },
          user: {
            connect: { id: userId },
          },
        })
        const chaptersData = chapters.map((chapter) => ({
          title: chapter.title!,
          startTime: chapter.startTime!,
          endTime: chapter.endTime!,
          videoId: video.id,
        }))
        await this.chaptersRepository.createMany(chaptersData)
      }

      await this.videoAnalyticsRepository.create({
        video: {
          connect: { id: video.id },
        },
      })

      return {
        video,
      }
    } else {
      if (type === 'Vsl') {
        video = await this.videoRepository.create({
          url,
          name,
          type,
          duration,
          thumbnail,
          color: colorProgress,
          fictitiousProgress,
          receiveNotification,
          tags: 'Teste',
          format,
          user: {
            connect: { id: userId },
          },
        })
      } else {
        video = await this.videoRepository.create({
          url,
          name,
          type,
          duration,
          thumbnail,
          format,
          tags: 'Teste',
          user: {
            connect: { id: userId },
          },
        })
        const chaptersData = chapters.map((chapter) => ({
          title: chapter.title!,
          startTime: chapter.startTime!,
          endTime: chapter.endTime!,
          videoId: video.id,
        }))
        await this.chaptersRepository.createMany(chaptersData)
      }

      await this.videoAnalyticsRepository.create({
        video: {
          connect: { id: video.id },
        },
      })

      return {
        video,
      }
    }
  }
}
