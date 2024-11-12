export const planMappingStripe = (planName: string): string => {
  switch (planName) {
    case 'Mensal - Essencial':
      return 'prod_R7hpQ2CpL7X2oo'
    case 'Mensal - Profissional':
      return 'prod_R7hqAIibmywFsa'
    case 'Mensal - Ilimitado':
      return 'prod_R7hqOCWJRIKkZz'
    default:
      return 'prod_R7hpQ2CpL7X2oo'
  }
}
