import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { VideosRepository } from '../video-repository'

export class PrimasVideosRepository implements VideosRepository {
  async findById(id: string) {
    const video = await prisma.video.findUnique({
      where: {
        id,
      },
      include: {
        Chapter: true,
        VideoButtons: true,
      },
    })

    return video
  }

  async findByUserId(userId: string) {
    const video = await prisma.video.findFirst({
      where: {
        userId,
      },
      include: {
        Chapter: true,
        VideoButtons: true,
      },
    })

    return video
  }

  async findByPlayerId(id: string) {
    const video = await prisma.video.findFirst({
      where: {
        videoPlayerid: id,
      },
    })

    return video
  }
  async findManyByUserId(userId: string) {
    const videos = await prisma.video.findMany({
      where: {
        userId,
      },
      include: {
        Chapter: true,
        VideoButtons: true,
        analytics: {
          include: {
            viewTimestamps: true,
            viewUnique: true,
          },
        },
      },
    })

    return videos
  }

  async findManyContainVideoFormByUserId(userId: string) {
    const videos = await prisma.video.findMany({
      where: {
        userId,
        VideoForm: {
          some: {},
        },
      },
      include: {
        VideoForm: {
          include: {
            LeadFormVideo: true,
          },
        },
      },
    });

    return videos;
  }

  async findManyByNotFolderId(userId: string) {
    const videosNotFolderId = await prisma.video.findMany({
      where: {
        userId,
        folderId: undefined,
      },
      include: {
        Chapter: true,
        VideoButtons: true,
        analytics: {
          include: {
            viewTimestamps: true,
            viewUnique: true,
          },
        },
      },
    })

    return videosNotFolderId
  }

  async create(data: Prisma.VideoCreateInput) {
    const video = await prisma.video.create({
      data,
    })

    return video
  }

  async update(videoId: string, data: Prisma.VideoUpdateInput) {
    const video = await prisma.video.update({
      where: {
        id: videoId,
      },
      data,
    })

    return video
  }

  async delete(id: string) {
    const video = await prisma.video.delete({
      where: {
        id,
      },
    })

    return video
  }

  async deleteAll(userId: string) {
    const video = await prisma.video.deleteMany({
      where: {
        userId,
      },
    })

    return video
  }

  async updateFolderId(videoId: string, folderId: string) {
    const video = await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        folder: {
          connect: {
            id: folderId,
          },
        },
      },
    })

    return video
  }
}
