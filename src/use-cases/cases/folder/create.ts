import { Folder } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, FoldersRepository } from '@/repositories'

interface CreateFolderUseCaseRequest {
  name: string
  userId: string
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
  }: CreateFolderUseCaseRequest): Promise<CreateFolderUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const folder = await this.folderRepository.create({
      name,
      user: {
        connect: { id: userId },
      },
    })

    return {
      folder,
    }
  }
}
