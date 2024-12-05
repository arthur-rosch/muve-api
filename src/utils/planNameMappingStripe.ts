import { env } from '../env';
export const planNameMappingStripe = (priceId: string): string => {
  switch (priceId) {
    case env.STRIPE_PRICE_ID_ESSENCIAL:
      return 'Mensal - Essencial';
    case env.STRIPE_PRICE_ID_PROFISSIONAL:
      return 'Mensal - Profissional';
    case env.STRIPE_PRICE_ID_ILIMITADO:
      return 'Mensal - Ilimitado';
    default:
      return 'Plano desconhecido';
  }
};
