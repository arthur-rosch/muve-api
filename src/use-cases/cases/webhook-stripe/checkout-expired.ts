import { sendEmail } from '@/services'
import { CheckoutExpired } from '@/templates'
import { LeadsRepository } from '@/repositories'

interface CheckoutExpiredUseCaseRequest {
  email: string
}

interface CheckoutExpiredUseCaseResponse {
  emailSend: boolean
}

export class CheckoutExpiredUseCase {
  constructor(private leadsRepository: LeadsRepository) {}

  async execute({
    email,
  }: CheckoutExpiredUseCaseRequest): Promise<CheckoutExpiredUseCaseResponse> {
    const lead = await this.leadsRepository.findByEmail(email)

    const checkoutExpired = CheckoutExpired({
      name: lead.name,
      url: 'https://muveplayer.com/',
    })

    const status = await sendEmail({
      to: email,
      html: checkoutExpired,
      from: 'contato@muveplayer.com',
      subject: 'Quase lá! Complete seu cadastro e comece a testar o Muve 🎥',
    })

    return { emailSend: !!status }
  }
}
