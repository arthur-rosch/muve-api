import { Lead } from '@prisma/client';
import { planMappingStripe } from '../../../utils';
import { createStripeCheckout } from '../../../services';
import { LeadsRepository, UsersRepository } from '../../../repositories';
import { UserAlreadyExistsError } from '@/use-cases/erros';

interface CreateLeadUserCaseRequest {
  plan: string;
  name: string;
  phone: string;
  email: string;
  document: string;
}

interface CreateLeadUseCaseResponse {
  lead: Lead;
  checkoutUrl: string;
}

export class CreateLeadUseCase {
  constructor(
    private leadRepository: LeadsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    plan,
    name,
    email,
    phone,
    document,
  }: CreateLeadUserCaseRequest): Promise<CreateLeadUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new UserAlreadyExistsError();
    }

    const lead = await this.leadRepository.create({
      plan,
      name,
      email,
      phone,
      document,
    });

    const priceIdStripeProduct = planMappingStripe(plan);

    const { url } = await createStripeCheckout({
      leadId: lead.id,
      email: lead.email,
      priceId: priceIdStripeProduct,
      success_url: `https://web.muveplayer.com/thanks`,
    });

    return { lead, checkoutUrl: url };
  }
}
