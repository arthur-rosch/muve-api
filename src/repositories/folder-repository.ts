import { Prisma, Folder } from '@prisma/client'

export interface FoldersRepository {
  findById(id: string): Promise<Folder | null>
  findByUserId(userId: string): Promise<Folder | null>
  findManyByUserId(userId: string): Promise<Folder[]>

  favoriteFolder(folderId: string, value: boolean): Promise<Folder>

  delete(id: string): Promise<Folder>
  create(data: Prisma.FolderCreateInput): Promise<Folder>
}
