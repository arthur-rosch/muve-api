import { Prisma, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { UsersRepository } from '../user-repository'

export class PrimasUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findUsersWithFlagReceiveNotificationsTrue(): Promise<Array<{ id: string; phone: string }> | null> {
    const users = await prisma.user.findMany({
      where: {
        isPhoneVerified: true,
      },
      select: {
        id: true,
        phone: true, 
      },
    })

    return users
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        ...data,
        role: 'MEMBER',
      },
    })

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    })

    return user
  }
}
