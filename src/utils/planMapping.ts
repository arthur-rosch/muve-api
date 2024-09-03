import { Plan } from '@prisma/client'

export const planMapping: { [key: string]: Plan } = {
  'Mensal - Essencial': 'ESSENTIAL',
  'Mensal - Profissional': 'PROFESSIONAL',
  'Mensal - Ilimitado': 'UNLIMITED',
  'Anual - Essencial': 'ESSENTIAL',
  'Anual - Profissional': 'PROFESSIONAL',
  'Anual - Ilimitado': 'UNLIMITED',
}
