import { Signature } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import { UsersRepository, SignaturesRepository } from '@/repositories'

interface GetManySignatureByUserIdUseCaseRequest {
  userId: string
}

interface GetManySignatureByUserIdUseCaseResponse {
  signatures: Signature[]
}

export class GetManySignatureByUserIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private signaturesRepository: SignaturesRepository,
  ) {}

  async execute({
    userId,
  }: GetManySignatureByUserIdUseCaseRequest): Promise<GetManySignatureByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const signatures = await this.signaturesRepository.findManyByUserId(userId)

    return {
      signatures,
    }
  }
}
