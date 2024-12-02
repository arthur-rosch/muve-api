import { Video } from '@prisma/client'
import { AccessDeniedError, NotFoundErros } from '@/use-cases/erros'
import {
  FoldersRepository,
  UsersRepository,
  VideosRepository,
} from '@/repositories'

interface EditFolderIdVideoUseCaseRequest {
  userId: string
  videoId: string
  folderId: string
}

interface EditFolderIdVideoUseCaseResponse {
  video: Video
}

export class EditFolderIdVideoUseCase {
  constructor(
    private userRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private folderRepository: FoldersRepository,
  ) {}

  async execute({
    videoId,
    folderId,
    userId,
  }: EditFolderIdVideoUseCaseRequest): Promise<EditFolderIdVideoUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const folder = await this.folderRepository.findById(folderId)

    if (!folder) {
      throw new NotFoundErros('Folder')
    }

    const video = await this.videoRepository.findById(videoId)

    if (!video) {
      throw new NotFoundErros('Video')
    }

    if (video.userId !== user.id && folder.userId !== user.id) {
      throw new AccessDeniedError('Folder')
    }

    if (video.userId !== user.id) {
      throw new AccessDeniedError('Video')
    }

    const newVideo = await this.videoRepository.updateFolderId(
      videoId,
      folderId,
    )

    return { video: newVideo }
  }
}
