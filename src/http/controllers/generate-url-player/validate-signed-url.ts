import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeValidateSignedUrlUseCase } from '@/use-cases/factories/tokenPlayer/make-validate-signed-url-use-case'

const algorithm = 'aes-256-cbc'
const secretKey = 'teste'
const iv = crypto.randomBytes(16)

function extractParamsFromUrl(url: string): {
  videoPlayerId?: string
  token?: string
} {
  const urlObj = new URL(url)
  const videoPlayerId = urlObj.searchParams.get('videoPlayerId')
  const token = urlObj.searchParams.get('token')
  return { videoPlayerId, token }
}

function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

function decrypt(text: string) {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift()!, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv,
  )
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export async function validateSignedUrl(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { url } = request.body as { url: string }

  if (!url) {
    return reply.status(400).send({ message: 'URL is required' })
  }

  const decryptedUrl = decrypt(url)
  const { videoPlayerId, token } = extractParamsFromUrl(decryptedUrl)

  if (!videoPlayerId || !token) {
    return reply.status(400).send({ message: 'Missing videoPlayerId or token' })
  }

  try {
    const validateSignedUrlUseCase = makeValidateSignedUrlUseCase()
    const isValid = await validateSignedUrlUseCase.execute(videoPlayerId, token)

    if (isValid) {
      const encryptedVideoUrl = encrypt(decryptedUrl) // Criptografa a URL para enviar ao frontend
      return reply
        .status(200)
        .send({ message: 'Token valid', encryptedVideoUrl })
    } else {
      return reply.status(403).send({ message: 'Invalid or expired token' })
    }
  } catch (err) {
    return reply.status(500).send({ message: err.message })
  }
}
