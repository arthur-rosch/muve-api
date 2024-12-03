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
    return reply.status(401).send({ message: 'Unauthorized' }) // Correspondente ao front
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

    if (!signature) {
      return reply.status(401).send({ message: 'Subscription not found.' }) // Correspondente ao front
    }

    if (signature.status === 'canceled') {
      return reply.status(403).send({ message: 'Subscription cancelled.' }) // Correspondente ao front
    }

    if (signature.status === 'past_due') {
      return reply.status(403).send({ message: 'Late subscription.' }) // Correspondente ao front
    }

    if (signature.status === 'trialing') {
      const trialEndDate = signature.trial_end_date
      if (trialEndDate && new Date(trialEndDate) < new Date()) {
        return reply.status(403).send({ message: 'Trial expired.' }) // Correspondente ao front
      }
    }

    if (
      signature.status !== 'active' &&
      signature.status !== 'trialing' &&
      signature.status !== 'free'
    ) {
      return reply.status(403).send({ message: 'Invalid subscription.' }) // Correspondente ao front
    }

    const planName = planNameMappingStripe(signature.plan)
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
      return reply.status(403).send({ message: 'Video limit exceeded.' }) // Correspondente ao front
    }
  } catch (error) {
    console.error('Erro ao verificar limite de vídeos:', error)
    reply.status(500).send({ message: 'Internal server error.' }) // Correspondente ao front
  }
}

export default checkVideoLimitMiddleware
