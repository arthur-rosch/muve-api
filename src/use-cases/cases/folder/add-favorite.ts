import { Folder } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, FoldersRepository } from '@/repositories'

interface AddFavoriteUseCaseRequest {
  userId: string
  folderId: string
  value: boolean
}

interface AddFavoriteUseCaseResponse {
  folder: Folder
}

export class AddFavoriteUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private folderRepository: FoldersRepository,
  ) {}

  async execute({
    userId,
    value,
    folderId,
  }: AddFavoriteUseCaseRequest): Promise<AddFavoriteUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const folder = await this.folderRepository.findById(folderId)

    if (!folder) {
      throw new NotFoundErros('Folder')
    }

    if (folder.userId !== user.id) {
      throw new AccessDeniedError('Folder')
    }

    const favoriteFolder = await this.folderRepository.favoriteFolder(
      folder.id,
      value,
    )

    return {
      folder: favoriteFolder,
    }
  }
}
