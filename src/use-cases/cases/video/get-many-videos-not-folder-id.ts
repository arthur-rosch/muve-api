import { Video } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, VideosRepository } from '@/repositories'

interface GetManyVideoNotFolderIdUseCaseRequest {
  userId: string
}

interface GetManyVideoNotFolderIdUseCaseResponse {
  videos: Video[]
}

export class GetManyVideoNotFolderIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
  ) {}

  async execute({
    userId,
  }: GetManyVideoNotFolderIdUseCaseRequest): Promise<GetManyVideoNotFolderIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const videos = await this.videoRepository.findManyByNotFolderId(userId)

    return {
      videos,
    }
  }
}
