export const planMappingStripe = (planName: string): string => {
  switch (planName) {
    case 'Mensal - Essencial':
      return 'price_1QFSPrEb05Ibkd2B63CkdONX'
    case 'Mensal - Profissional':
      return 'price_1QFSQWEb05Ibkd2BaOS032wb'
    case 'Mensal - Ilimitado':
      return 'price_1QFSQwEb05Ibkd2BjOjnD8Zs'
    default:
      return 'price_1QFSPrEb05Ibkd2B63CkdONX'
  }
}
