import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { FoldersRepository } from '../folder-repository'

export class PrismaFoldersRepository implements FoldersRepository {
  async findById(id: string) {
    const folder = await prisma.folder.findFirst({
      where: {
        id,
      },
      include: {
        videos: true,
      },
    })

    return folder
  }

  async findByUserId(userId: string) {
    const folder = await prisma.folder.findFirst({
      where: {
        userId,
      },
      include: {
        videos: true,
      },
    })

    return folder
  }

  async findManyByUserId(userId: string) {
    const folders = await prisma.folder.findMany({
      where: {
        userId,
      },
      include: {
        videos: {
          include: {
            analytics: {
              include: {
                viewTimestamps: true,
                viewUnique: true,
              },
            },
            VideoButtons: true,
            Chapter: true,
          },
        },
      },
    })

    return folders
  }

  async favoriteFolder(folderId: string, value: boolean) {
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        favorite: value,
      },
    })

    return folder
  }

  async create(data: Prisma.FolderCreateInput) {
    const folder = await prisma.folder.create({
      data,
      include: {
        videos: true,
      },
    })

    return folder
  }

  async delete(id: string) {
    const folder = await prisma.folder.delete({
      where: {
        id,
      },
    })

    return folder
  }
}
