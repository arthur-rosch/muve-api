import { PrismaClient } from '@prisma/client'
import { planNameMappingStripe } from '../../utils'
import { FastifyRequest, FastifyReply } from 'fastify'

const prisma = new PrismaClient()

export const checkVideoLimitMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const userId = request.user?.sub

  if (!userId) {
    return reply.status(401).send({ message: 'Usuário não autenticado.' })
  }

  try {
    const signature = await prisma.signature.findFirst({
      where: {
        userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    if (signature.status === 'canceled') {
      return reply.status(403).send({ message: 'Assinatura cancelada.' })
    }

    if (signature.status === 'past_due') {
      return reply
        .status(403)
        .send({ message: 'Assinatura com pagamento atrasado.' })
    }

    if (signature.status === 'trialing') {
      const trialEndDate = signature.trial_end_date
      if (trialEndDate && new Date(trialEndDate) < new Date()) {
        return reply.status(403).send({ message: 'Período de teste expirado.' })
      }
    }

    if (signature.status !== 'active' && signature.status !== 'trialing') {
      return reply.status(403).send({ message: 'Assinatura inválida.' })
    }

    const planName = planNameMappingStripe(signature.plan)
    console.log(planName)
    let videoLimit: number

    switch (planName) {
      case 'Mensal - Essencial':
        videoLimit = 10
        break
      case 'Mensal - Profissional':
        videoLimit = 25
        break
      case 'Mensal - Ilimitado':
        videoLimit = 150
        break
      default:
        videoLimit = 1
    }

    const videoCount = await prisma.video.count({
      where: {
        userId,
      },
    })

    if (videoCount >= videoLimit) {
      return reply.status(403).send({ message: 'Limite de vídeos excedido.' })
    }
  } catch (error) {
    console.error('Erro ao verificar limite de vídeos:', error)
    reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}

export default checkVideoLimitMiddleware
