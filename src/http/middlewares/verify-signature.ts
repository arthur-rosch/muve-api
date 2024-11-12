import { PrismaClient } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'

const prisma = new PrismaClient()

export const checkSignatureMiddleware = async (
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

    // Verifica se há uma assinatura
    if (!signature) {
      return reply.status(401).send({ message: 'Usuário sem Plano' })
    }

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

    // Se a assinatura está ativa ou no período de teste válido, o acesso é permitido.
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error)
    reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}

export default checkSignatureMiddleware
