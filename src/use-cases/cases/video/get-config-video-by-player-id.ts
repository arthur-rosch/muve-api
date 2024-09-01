import { NotFoundErros } from '@/use-cases/erros'
import { VideosRepository } from '@/repositories'
// const youtubedl = require('youtube-dl-exec')

interface GetVideoByPlayerIdUseCaseRequest {
  videoPlayerId: string
}

interface GetVideoByPlayerIdUseCaseResponse {
  color: string
  type: string
  fictitiousProgress: boolean
  url: string
}

export class GetVideoByPlayerIdUseCase {
  constructor(private videoRepository: VideosRepository) {}

  async execute({
    videoPlayerId,
  }: GetVideoByPlayerIdUseCaseRequest): Promise<GetVideoByPlayerIdUseCaseResponse> {
    const video = await this.videoRepository.findByPlayerId(videoPlayerId)

    if (!video) {
      throw new NotFoundErros('Video')
    }
    const { color, type, fictitiousProgress, url } = video

    // youtubedl('url', {
    //   dumpSingleJson: true,
    //   noCheckCertificates: true,
    //   noWarnings: true,
    //   preferFreeFormats: true,
    //   format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    //   addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
    // }).then((output) => console.log(output))

    return {
      color,
      type,
      fictitiousProgress,
      url,
    }
  }
}
