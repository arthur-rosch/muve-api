import { Folder } from '@prisma/client'
import { NotFoundErros } from '../../../use-cases/erros'
import { UsersRepository, FoldersRepository } from '../../../repositories'

interface GetManyFoldersByUserIdUseCaseRequest {
  userId: string
}

interface GetManyFoldersByUserIdUseCaseResponse {
  folders: Folder[]
}

export class GetManyFoldersByUserIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private folderRepository: FoldersRepository,
  ) {}

  async execute({
    userId,
  }: GetManyFoldersByUserIdUseCaseRequest): Promise<GetManyFoldersByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const folders = await this.folderRepository.findManyByUserId(userId)

    return {
      folders,
    }
  }
}
