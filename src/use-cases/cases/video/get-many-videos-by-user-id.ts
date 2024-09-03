import { Video } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, VideosRepository } from '@/repositories'

interface GetManyVideoByUserIdUseCaseRequest {
  userId: string
}

interface GetManyVideoByUserIdUseCaseResponse {
  videos: Video[]
}

export class GetManyVideoByUserIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
  ) {}

  async execute({
    userId,
  }: GetManyVideoByUserIdUseCaseRequest): Promise<GetManyVideoByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const videos = await this.videoRepository.findManyByUserId(userId)
    console.log(videos)
    return {
      videos,
    }
  }
}
