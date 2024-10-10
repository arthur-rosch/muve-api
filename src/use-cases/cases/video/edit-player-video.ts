import { Video } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '@/use-cases/erros'
import {
  ChaptersRepository,
  UsersRepository,
  VideosRepository,
} from '@/repositories'

interface DataEditPlayer {
  color?: string
  colorSmartPlayers?: string
  playAndPause?: boolean
  progressBar?: boolean
  timeTraveled?: boolean
  videoDuration?: boolean
  volumeButton?: boolean
  volumeBar?: boolean
  speed?: boolean
  fullscreen?: boolean
  smartAutoPlay?: boolean
  UrlCoverSmartAutoPlay?: string
  TextTopSmartAutoPlay?: string
  TextButtonSmartAutoPlay?: string
  continueWatching?: boolean
  watchingNow?: boolean
  watchingNowFontSize?: string
  watchingNowBgColor?: string
  watchingNowTextColor?: string
  ImageVideoPause?: boolean
  UrlCoverImageVideoPause?: string
  ImageOfFinished?: boolean
  UrlCoverImageOfFinished?: string
}

interface EditPlayerVideoRequest {
  userId: string
  videoId: string
  dataEdit: DataEditPlayer
  Chapters?: {
    title?: string
    startTime?: string
    endTime?: string
  }[]
}

interface EditPlayerVideoResponse {
  videoUpdated: Video
}

export class EditPlayerVideo {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private chaptersRepository: ChaptersRepository,
  ) {}

  async execute(
    data: EditPlayerVideoRequest,
  ): Promise<EditPlayerVideoResponse> {
    const user = await this.usersRepository.findById(data.userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const video = await this.videoRepository.findById(data.videoId)

    if (!video) {
      throw new NotFoundErros('Video')
    }

    if (video.userId !== user.id) {
      throw new AccessDeniedError('Video')
    }

    let chaptersData

    const videoUpdated = await this.videoRepository.update(
      data.videoId,
      data.dataEdit,
    )

    if (video.type === 'Curso' && data.Chapters) {
      chaptersData = data.Chapters.map((chapter) => ({
        title: chapter.title!,
        startTime: chapter.startTime!,
        endTime: chapter.endTime!,
        videoId: video.id,
      }))
    }

    if (video.type === 'Curso' && chaptersData) {
      await this.chaptersRepository.createMany(chaptersData)
    }

    return {
      videoUpdated,
    }
  }
}
