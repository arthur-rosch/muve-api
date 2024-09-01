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
        videos: true,
      },
    })

    return folders
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
      include: {
        videos: true,
      },
    })

    return folder
  }
}
