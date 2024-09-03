import { NotFoundErros } from '@/use-cases/erros'
import { Signature, StatusSignature, User } from '@prisma/client'
import {
  UsersRepository,
  VideosRepository,
  SignaturesRepository,
} from '@/repositories'

interface SubscriptionExpiredUseCaseRequest {
  email: string
  status: string
}

interface SubscriptionExpiredUseCaseResponse {
  user: User
  signature: Signature
}

export class SubscriptionExpiredUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private signaturesRepository: SignaturesRepository,
  ) {}

  async execute({
    email,
    status,
  }: SubscriptionExpiredUseCaseRequest): Promise<SubscriptionExpiredUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const signature = await this.signaturesRepository.findByUserId(user.id)

    if (!signature) {
      throw new NotFoundErros('Signature')
    }

    const newStatusSignature =
      await this.signaturesRepository.updateStatusSignature(
        signature.id,
        status as StatusSignature,
      )

    return {
      user,
      signature: newStatusSignature,
    }
  }
}
