import { Prisma, Video } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { VideosRepository } from '../video-repository'

export class PrimasVideosRepository implements VideosRepository {
  async findById(id: string) {
    const video = await prisma.video.findFirst({
      where: {
        id,
      },
      include: {
        Chapter: true,
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

  async findManyByNotFolderId(userId: string) {
    const videosNotFolderId = await prisma.video.findMany({
      where: {
        userId,
        folderId: undefined,
      },
      include: {
        Chapter: true,
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

  async findVideoWithNotificationFlag(): Promise<boolean> {
    const videosWithActiveNotification = await prisma.video.findMany({
      where: {
        receiveNotification: true,
        type: 'Vsl'
      }
      
    });
  
    return videosWithActiveNotification.length > 0;
  }

  async findVideosWithReceiveNotificationByIds(ids: string[]){
    const videosWithReceiveNotificationsByIds = await prisma.video.findMany({
      where: {
        userId: {
          in: ids,
        },
        type: 'Vsl',
        receiveNotification: true,
      },
      include: {
        analytics: {
          include: {
            viewTimestamps: true,
            viewUnique: true,
          },
        },
      },
    });
    
    return videosWithReceiveNotificationsByIds;
  }
  

  async create(data: Prisma.VideoCreateInput) {
    const video = await prisma.video.create({
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
}
