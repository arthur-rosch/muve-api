import { Prisma, Signature, StatusSignature } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { SignaturesRepository } from '../signature-repository'

export class PrismaSignaturesRepository implements SignaturesRepository {
  async findByUserId(userId: string): Promise<Signature | null> {
    const signature = await prisma.signature.findFirst({
      where: {
        userId,
      },
    })
    return signature
  }

  async findManyByUserId(userId: string): Promise<Signature[]> {
    const signatures = await prisma.signature.findMany({
      where: {
        userId,
      },
    })
    return signatures
  }

  async checkStatusSignature(userId: string): Promise<Signature | null> {
    const signature = await prisma.signature.findFirst({
      where: {
        userId,
        status: 'ACTIVE',
      },
    })
    return signature
  }

  async updateStatusSignature(
    signatureId: string,
    status: StatusSignature,
  ): Promise<Signature> {
    const updatedSignature = await prisma.signature.update({
      where: {
        id: signatureId,
      },
      data: {
        status,
      },
    })
    return updatedSignature
  }

  async delete(id: string): Promise<Signature> {
    const deletedSignature = await prisma.signature.delete({
      where: {
        id,
      },
    })
    return deletedSignature
  }

  async create(data: Prisma.SignatureCreateInput): Promise<Signature> {
    const createdSignature = await prisma.signature.create({
      data,
    })
    return createdSignature
  }
}
