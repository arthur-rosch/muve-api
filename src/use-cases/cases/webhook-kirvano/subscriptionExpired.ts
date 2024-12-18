import { NotFoundErros } from '../../../use-cases/erros';
import { Signature, User } from '@prisma/client';
import {
  UsersRepository,
  VideosRepository,
  SignaturesRepository,
} from '../../../repositories';
import { LateSignatureEmail } from '../../../templates';
import { sendEmail } from '../../../services/send-email';
import { formatDate } from '../../../utils/formatDate';

interface SubscriptionExpiredUseCaseRequest {
  email: string;
  status: string;
}

interface SubscriptionExpiredUseCaseResponse {
  user: User;
  signature: Signature;
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
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundErros('User');
    }

    const signature = await this.signaturesRepository.findByUserId(user.id);

    if (!signature) {
      throw new NotFoundErros('Signature');
    }

    const newStatusSignature =
      await this.signaturesRepository.updateStatusSignature(
        signature.id,
        status.toLocaleLowerCase(),
      );

    const lateSignatureEmail = LateSignatureEmail({
      name: user.name,
      expirationDate: formatDate(newStatusSignature.next_charge_date),
      paymentLink: 'https://muveplayer.com/',
      value: newStatusSignature.price,
    });
    await sendEmail({
      from: 'contato@muveplayer.com', // O remetente
      to: email, // O destinatário
      subject: 'Assinatura Atrasada Muve Player', // Assunto do email
      html: lateSignatureEmail,
    });

    return {
      user,
      signature: newStatusSignature,
    };
  }
}
