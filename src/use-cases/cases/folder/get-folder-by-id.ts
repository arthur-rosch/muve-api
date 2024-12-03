import { Folder } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros'
import { UsersRepository, FoldersRepository } from '../../../repositories'

interface GetFolderByIdUseCaseRequest {
  userId: string
  folderId: string
}

interface GetFolderByIdUseCaseResponse {
  folder: Folder
}

export class GetFolderByIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private folderRepository: FoldersRepository,
  ) {}

  async execute({
    userId,
    folderId,
  }: GetFolderByIdUseCaseRequest): Promise<GetFolderByIdUseCaseResponse> {
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

    return {
      folder,
    }
  }
}
