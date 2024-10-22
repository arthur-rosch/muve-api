import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient, StatusSignature } from '@prisma/client'

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
        status: StatusSignature.APPROVED,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    if (!signature) {
      return reply.status(401).send({ message: 'Usuário sem Plano' })
    }

    const nextChargeDate = new Date(signature.next_charge_date)

    if (isNaN(nextChargeDate.getTime()) || nextChargeDate < new Date()) {
      return reply
        .status(403)
        .send({ message: 'Assinatura expirada ou atrasada.' })
    }
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error)
    reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}

export default checkSignatureMiddleware
