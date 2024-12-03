import { Folder } from '@prisma/client'
import { NotFoundErros } from '../../../use-cases/erros'
import { UsersRepository, FoldersRepository } from '../../../repositories'

interface CreateFolderUseCaseRequest {
  name: string
  userId: string
  coverUrl?: string
  videosId?: string[]
}

interface CreateFolderUseCaseResponse {
  folder: Folder
}

export class CreateFolderUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private folderRepository: FoldersRepository,
  ) {}

  async execute({
    name,
    userId,
    coverUrl,
    videosId,
  }: CreateFolderUseCaseRequest): Promise<CreateFolderUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const folder = await this.folderRepository.create({
      name,
      coverUrl,
      user: {
        connect: { id: userId },
      },
      videos: {
        connect: videosId?.map((videoId) => ({ id: videoId })) ?? [],
      },
    })

    return {
      folder,
    }
  }
}
