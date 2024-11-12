import { Video } from '@prisma/client'
import { NotFoundErros } from '@/use-cases/erros'
import {
  UsersRepository,
  VideosRepository,
  SignaturesRepository,
} from '@/repositories'

interface GetVideoByIdUseCaseRequest {
  videoId: string
}

interface GetVideoByIdUseCaseResponse {
  video?: Video
  message?: string
}

export class GetVideoByIdUseCase {
  constructor(
    private userRepository: UsersRepository,
    private videoRepository: VideosRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    videoId,
  }: GetVideoByIdUseCaseRequest): Promise<GetVideoByIdUseCaseResponse> {
    console.log(videoId)
    const video = await this.videoRepository.findById(videoId)
    console.log(video)
    if (!video) {
      throw new NotFoundErros('Video')
    }

    const user = await this.userRepository.findById(video.userId)

    if (!user) {
      throw new NotFoundErros('User')
    }

    const signature = await this.signatureRepository.findByUserId(video.userId)

    if (!signature) {
      return { message: 'Usuário sem Plano' }
    }

    if (signature.status === 'canceled') {
      return { message: 'Assinatura cancelada.' }
    }

    if (signature.status === 'past_due') {
      return { message: 'Assinatura com pagamento atrasado.' }
    }

    if (signature.status === 'trialing') {
      const trialEndDate = signature.trial_end_date
      if (trialEndDate && new Date(trialEndDate) < new Date()) {
        return { message: 'Período de teste expirado.' }
      }
    }

    if (signature.status !== 'active' && signature.status !== 'trialing') {
      return { message: 'Assinatura inválida.' }
    }

    return { video }
  }
}
