import { Video } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { VideosRepository } from '@/repositories'
import { getUrlYoutube } from '@/services'

interface GetVideoByIdUseCaseRequest {
  videoId: string
}

interface GetVideoByIdUseCaseResponse {
  video: Video
}

export class GetVideoByIdUseCase {
  constructor(private videoRepository: VideosRepository) {}

  async execute({
    videoId,
  }: GetVideoByIdUseCaseRequest): Promise<GetVideoByIdUseCaseResponse> {
    const video = await this.videoRepository.findById(videoId)

    if (!video) {
      throw new NotFoundErros('Video')
    }

    const url = await getUrlYoutube(video.url)

    video.url = url

    return { video }
  }
}
