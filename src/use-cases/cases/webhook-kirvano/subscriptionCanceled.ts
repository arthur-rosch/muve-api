import { NotFoundErros } from '@/use-cases/erros'
import { Signature, StatusSignature, User } from '@prisma/client'
import {
  UsersRepository,
  VideosRepository,
  SignaturesRepository,
} from '@/repositories'
import { UnsubscribeEmail } from '@/templates'
import { sendEmail } from '@/services/send-email'

interface SubscriptionCanceledUseCaseRequest {
  email: string
  status: string
}

interface SubscriptionCanceledUseCaseResponse {
  user: User
  signature: Signature
}

export class SubscriptionCanceledUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private signaturesRepository: SignaturesRepository,
  ) {}

  async execute({
    email,
    status,
  }: SubscriptionCanceledUseCaseRequest): Promise<SubscriptionCanceledUseCaseResponse> {
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

    const unsubscribe = UnsubscribeEmail({
      name: user.name,
    })
    await sendEmail({
      from: 'contato@muveplayer.com',
      to: email, // O destinatário
      subject: 'Assinatura Cancelada Muve player', // Assunto do email
      html: unsubscribe,
    })

    return {
      user,
      signature: newStatusSignature,
    }
  }
}
