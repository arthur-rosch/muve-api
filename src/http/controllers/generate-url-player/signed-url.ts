import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGenerateSignedUrlUseCase } from '@/use-cases/factories/tokenPlayer/make-generate-signed-url-use-case'

export async function generateSignedUrl(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const generateSignedUrlBodySchema = z.object({
    videoPlayerId: z.string(),
  })

  const { videoPlayerId } = generateSignedUrlBodySchema.parse(request.body)

  try {
    const generateSignedUrlUseCase = makeGenerateSignedUrlUseCase()
    const signedUrl = await generateSignedUrlUseCase.execute(videoPlayerId)

    return reply.status(200).send({ signedUrl })
  } catch (err) {
    return reply.status(500).send({ message: err.message })
  }
}
