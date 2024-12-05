import { env } from '../env';

export const planMappingStripe = (planName: string): string => {
  switch (planName) {
    case 'Mensal - Essencial':
      return env.STRIPE_PRICE_ID_ESSENCIAL;
    case 'Mensal - Profissional':
      return env.STRIPE_PRICE_ID_PROFISSIONAL;
    case 'Mensal - Ilimitado':
      return env.STRIPE_PRICE_ID_ILIMITADO;
    default:
      return env.STRIPE_PRICE_ID_ESSENCIAL;
  }
};
