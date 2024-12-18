import { Video } from '@prisma/client'
import { NotFoundErros } from '../../../use-cases/erros'
import { UsersRepository, VideosRepository } from '../../../repositories'

interface GetManyVideoContainFormByUserIdUseCaseRequest {
  userId: string
}

interface GetManyVideoContainFormByUserIdUseCaseResponse {
  videos: Video[]
}

export class GetManyVideoContainFormByUserIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
  ) {}

  async execute({
    userId,
  }: GetManyVideoContainFormByUserIdUseCaseRequest): Promise<GetManyVideoContainFormByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const videos = await this.videoRepository.findManyContainVideoFormByUserId(userId)

    return {
      videos,
    }
  }
}
