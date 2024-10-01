import { Plan } from '@prisma/client'

export const planMapping = (planName: string): Plan | undefined => {
  switch (planName) {
    case 'MMensal -  Essencial':
      return 'ESSENTIAL'
    case 'Mensal -  Profissional':
      return 'PROFESSIONAL'
    case 'Mensal -  Ilimitado':
      return 'UNLIMITED'
    default:
      return undefined // ou você pode lançar um erro ou retornar um valor padrão
  }
}
