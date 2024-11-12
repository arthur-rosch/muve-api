export const planNameMappingStripe = (priceId: string): string => {
  switch (priceId) {
    case 'prod_R7hpQ2CpL7X2oo':
      return 'Mensal - Essencial'
    case 'prod_R7hqAIibmywFsa':
      return 'Mensal - Profissional'
    case 'prod_R7hqOCWJRIKkZz':
      return 'Mensal - Ilimitado'
    default:
      return 'Plano desconhecido'
  }
}
