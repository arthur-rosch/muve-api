import { Video } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import {
  UsersRepository,
  VideosRepository,
  FoldersRepository,
  ChaptersRepository,
  VideoAnalyticsRepository,
} from '@/repositories'

interface CreateVideoUseCaseRequest {
  url: string
  userId: string
  duration: string
  folderId?: string
  type: 'Vsl' | 'Curso'
  format: '9/16' | '16/9'
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
    type,
    userId,
    format,
    folderId,
    duration,
    chapters,
    colorProgress,
    fictitiousProgress,
  }: CreateVideoUseCaseRequest): Promise<CreateVideoUseCaseResponse> {
    let video
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    if (folderId) {
      const folder = await this.folderRepository.findById(folderId)

      if (!folder) {
        throw new NotFoundErros('Folder')
      }

      if (type === 'Vsl') {
        video = await this.videoRepository.create({
          url,
          type,
          duration,
          color: colorProgress,
          fictitiousProgress,
          format,
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
          type,
          duration,
          format,
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
          type,
          duration,
          color: colorProgress,
          fictitiousProgress,
          tags: 'Teste',
          format,
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
          type,
          duration,
          format,
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
    }
  }
}
