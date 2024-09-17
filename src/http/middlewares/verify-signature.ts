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
    // Busca a assinatura mais recente do usuário
    const signature = await prisma.signature.findFirst({
      where: {
        userId,
        status: StatusSignature.APPROVED, // Apenas assinatura aprovada
      },
      orderBy: {
        created_at: 'desc', // Obtém a assinatura mais recente
      },
    })

    // Se não houver assinatura, o usuário é tratado como "free"
    if (!signature) {
      return
    }

    // Converte `next_charge_date` de string para Date para verificar a validade
    const nextChargeDate = new Date(signature.next_charge_date)

    // Verifica se a assinatura está expirada ou fora de validade
    if (isNaN(nextChargeDate.getTime()) || nextChargeDate < new Date()) {
      return reply
        .status(403)
        .send({ message: 'Assinatura expirada ou atrasada.' })
    }

    // Se a assinatura estiver válida, continue normalmente
  } catch (error) {
    console.error('Erro ao verificar assinatura:', error)
    reply.status(500).send({ message: 'Erro interno do servidor.' })
  }
}

export default checkSignatureMiddleware
