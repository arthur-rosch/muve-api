import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient, Plan, StatusSignature } from '@prisma/client'

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
    // Busca a assinatura mais recente do usuário
    const signature = await prisma.signature.findFirst({
      where: {
        userId,
        status: StatusSignature.APPROVED,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    let videoLimit: number

    if (!signature) {
      videoLimit = 1
    } else {
      const { plan } = signature

      switch (plan) {
        case Plan.FREE:
          videoLimit = 1
          break
        case Plan.ESSENTIAL:
          videoLimit = 10
          break
        case Plan.PROFESSIONAL:
          videoLimit = 25
          break
        case Plan.UNLIMITED:
          videoLimit = 250
          break
        default:
          videoLimit = 1
          break
      }
    }

    const videoCount = await prisma.video.count({
      where: {
        userId,
      },
    })

    if (videoCount >= videoLimit && videoLimit !== Infinity) {
      return reply.status(403).send({ message: 'Limite de vídeos excedido.' })
    }
  } catch (error) {
    console.error('Erro ao verificar limite de vídeos:', error)
    reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}

export default checkVideoLimitMiddleware
