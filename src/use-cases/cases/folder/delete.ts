import { Folder } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '../../../use-cases/erros'
import { UsersRepository, FoldersRepository } from '../../../repositories'

interface DeleteFolderUseCaseRequest {
  userId: string
  folderId: string
}

interface DeleteFolderUseCaseResponse {
  folder: Folder
}

export class DeleteFolderUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private folderRepository: FoldersRepository,
  ) {}

  async execute({
    userId,
    folderId,
  }: DeleteFolderUseCaseRequest): Promise<DeleteFolderUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const folder = await this.folderRepository.findById(folderId)

    if (!folder) {
      throw new NotFoundErros('User')
    }

    if (folder.userId !== user.id) {
      throw new AccessDeniedError('Folder')
    }

    const deletedFolder = await this.folderRepository.delete(folderId)

    return {
      folder: deletedFolder,
    }
  }
}
