import { stripe } from '@/lib'
import {
  LeadsRepository,
  UsersRepository,
  SignaturesRepository,
} from '@/repositories'
import { hash } from 'bcryptjs'

interface CheckoutExpiredUseCaseRequest {
  subscriptionId: string
  client_reference_id: string
}

interface CheckoutExpiredUseCaseResponse {
  emailSend: boolean
}

export class CheckoutExpiredUseCase {
  constructor(
    private leadsRepository: LeadsRepository,
    private userRepository: UsersRepository,
    private signatureRepository: SignaturesRepository,
  ) {}

  async execute({
    subscriptionId,
    client_reference_id,
  }: CheckoutExpiredUseCaseRequest): Promise<CheckoutExpiredUseCaseResponse> {
    const lead = await this.leadsRepository.findByEmail(client_reference_id)

    const password_hash = await hash(lead.document, 6)

    const user = await this.userRepository.create({
      password_hash,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      document: lead.document,
      stripeCustomersId: lead.stripeCustomersId,
    })

    const stripeSignature = await stripe.subscriptions.retrieve(subscriptionId)

    // const signature = await this.signatureRepository.create({

    // })

    await this.leadsRepository.delete(lead.id)

    return { emailSend: true }
  }
}
