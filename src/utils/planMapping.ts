export const planMapping = (planName: string): String | undefined => {
  switch (planName) {
    case 'Mensal - Essencial':
      return 'ESSENTIAL'
    case 'Mensal - Profissional':
      return 'PROFESSIONAL'
    case 'Mensal - Ilimitado':
      return 'UNLIMITED'
    case 'Mensal -  Essencial':
      return 'ESSENTIAL'
    default:
      return undefined // ou você pode lançar um erro ou retornar um valor padrão
  }
}
