import { EditFolderIdVideoUseCase } from '../../cases/video/edit-folderId-video'
import {
  PrimasUsersRepository,
  PrimasVideosRepository,
  PrismaFoldersRepository,
} from '@/repositories/prisma'

export function makeEditFolderIdVideoUseCase() {
  const usersRepository = new PrimasUsersRepository()
  const videoRepository = new PrimasVideosRepository()
  const folderRepository = new PrismaFoldersRepository()

  const editFolderIdVideoUseCase = new EditFolderIdVideoUseCase(
    usersRepository,
    videoRepository,
    folderRepository,
  )

  return editFolderIdVideoUseCase
}
