import { Video } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros'
import {
  ChaptersRepository,
  UsersRepository,
  VideoButtonsRepository,
  VideosRepository,
} from '../../../repositories'

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
  buttonsActive?: boolean
  chapterMenu?: boolean
  fictitiousProgressHeight?: string
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
  Buttons?: {
    buttonType?: 'below' | 'inside'
    buttonText?: string
    buttonSize?: string
    buttonLink?: string
    startTime?: string
    endTime?: string
    buttonAfterTheVideoEnds?: boolean
    backgroundColor?: string
    textColor?: string
    hoverBackgroundColor?: string
    hoverTextColor?: string
    buttonPosition?: string
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
    private videoButtonsRepository: VideoButtonsRepository,
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
    let buttonsData

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

    if (video.type === 'Vsl' && data.Buttons) {
      buttonsData = data.Buttons.map((button) => ({
        ...button,
        videoId: video.id,
      }))
    }

    if (video.type === 'Curso' && chaptersData) {
      await this.chaptersRepository.deleteManyByVideoId(video.id)

      await this.chaptersRepository.createMany(chaptersData)
    }

    if (video.type === 'Vsl' && buttonsData) {
      await this.videoButtonsRepository.deleteManyByVideoId(video.id)

      await this.videoButtonsRepository.createMany(buttonsData)
    }

    return {
      videoUpdated,
    }
  }
}
