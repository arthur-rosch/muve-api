import { Prisma, Signature, StatusSignature } from '@prisma/client'

export interface SignaturesRepository {
  findByUserId(userId: string): Promise<Signature | null>
  findManyByUserId(userId: string): Promise<Signature[]>

  checkStatusSignature(userId: string): Promise<Signature | null>
  updateStatusSignature(
    signatureId: string,
    status: StatusSignature,
  ): Promise<Signature>

  delete(id: string): Promise<Signature>
  create(data: Prisma.SignatureCreateInput): Promise<Signature>
}
