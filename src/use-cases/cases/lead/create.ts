import { Lead } from '@prisma/client'
import { planMappingStripe } from '@/utils'
import { LeadsRepository } from '@/repositories'
import { createStripeCheckout } from '@/services'

interface CreateLeadUserCaseRequest {
  plan: string
  name: string
  phone: string
  email: string
  document: string
}

interface CreateLeadUseCaseResponse {
  lead: Lead
  checkoutUrl: string
}

export class CreateLeadUseCase {
  constructor(private leadRepository: LeadsRepository) {}

  async execute({
    plan,
    name,
    email,
    phone,
    document,
  }: CreateLeadUserCaseRequest): Promise<CreateLeadUseCaseResponse> {
    const lead = await this.leadRepository.create({
      plan,
      name,
      email,
      phone,
      document,
    })

    const priceIdStripeProduct = planMappingStripe(plan)

    const { url } = await createStripeCheckout({
      leadId: lead.id,
      email: lead.email,
      priceId: priceIdStripeProduct,
      success_url: `http://localhost:8080/thanks`,
    })

    return { lead, checkoutUrl: url }
  }
}
