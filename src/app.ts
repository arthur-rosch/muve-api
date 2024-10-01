import { env } from './env'
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'

import {
  usersRoutes,
  videosRoutes,
  foldersRoutes,
  analyticsRoutes,
  generateUrlPlayerRoutes,
  webhookKirvanoRoutes,
  signatureRoutes,
} from './http/controllers'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

const corsOptions = {
  origin: (origin, callback) => {
    // Lista de origens permitidas
    const allowedOrigins = [
      'https://web.muveplayer.com',
      'http://localhost:8080',
      'https://seahorse-app-2xtkj.ondigitalocean.app',
    ]

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true) // Permite a origem
    } else {
      callback(new Error('Not allowed by CORS')) // Rejeita a origem
    }
  },
}

// Registra o plugin CORS
app.register(fastifyCors, corsOptions)
app.register(usersRoutes, { prefix: '/api' })
app.register(videosRoutes, { prefix: '/api' })
app.register(foldersRoutes, { prefix: '/api' })
app.register(analyticsRoutes, { prefix: '/api' })
app.register(signatureRoutes, { prefix: '/api' })
app.register(webhookKirvanoRoutes, { prefix: '/api' })
app.register(generateUrlPlayerRoutes, { prefix: '/api' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Aqui devemos registrar o erro em uma ferramenta externa como Datadog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
