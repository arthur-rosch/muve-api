import { Prisma, Signature, User } from '@prisma/client'

export type SignatureWithUser = Signature & {
  user: User
}
export interface SignaturesRepository {
  findByUserId(userId: string): Promise<Signature | null>
  findManyByUserId(userId: string): Promise<Signature[]>
  findLastByStripeSubscriptionId(subscriptionId: string): Promise<Signature>

  checkStatusSignature(userId: string): Promise<Signature | null>
  updateStatusSignature(signatureId: string, status: string): Promise<Signature>

  delete(id: string): Promise<Signature>
  create(data: Prisma.SignatureCreateInput): Promise<Signature>
  update(id: string, data: Prisma.SignatureUpdateInput): Promise<Signature>

  getSignaturesAtHalfTrial(): Promise<SignatureWithUser[]>
  getSignaturesTwoDaysAfterCreation(): Promise<SignatureWithUser[]>
  getSignaturesTwoDaysBeforeTrialEnds(): Promise<SignatureWithUser[]>
}
