import '@/cron'
import { env } from './env'
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import fastifyRawBody from 'fastify-raw-body'

import {
  leadsRoutes,
  usersRoutes,
  videosRoutes,
  foldersRoutes,
  analyticsRoutes,
  signatureRoutes,
  webhookStripeRoutes,
  webhookKirvanoRoutes,
  generateUrlPlayerRoutes,
  emailVerificationRoutes,
} from './http/controllers'

export const app = fastify()
app.register(fastifyRawBody, {
  global: false,
  runFirst: true,
  field: 'rawBody',
  encoding: 'utf8',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://web.muveplayer.com',
      'http://localhost:8080',
      'https://seahorse-app-2xtkj.ondigitalocean.app',
    ]

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

app.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  (req, body, done) => {
    try {
      const json = JSON.parse(body as string)
      done(null, json)
    } catch (err) {
      err.statusCode = 400
      done(err, undefined)
    }
  },
)

app.register(fastifyCors, corsOptions)
app.register(usersRoutes, { prefix: '/api' })
app.register(leadsRoutes, { prefix: '/api' })
app.register(videosRoutes, { prefix: '/api' })
app.register(foldersRoutes, { prefix: '/api' })
app.register(analyticsRoutes, { prefix: '/api' })
app.register(signatureRoutes, { prefix: '/api' })
app.register(webhookKirvanoRoutes, { prefix: '/api' })
app.register(emailVerificationRoutes, { prefix: '/api' })
app.register(generateUrlPlayerRoutes, { prefix: '/api' })

app.register(async (instance) => {
  instance.addHook('preValidation', (request, reply, done) => {
    request.rawBody = request.rawBody || ''
    done()
  })
  instance.register(webhookStripeRoutes, { prefix: '/api' })
})

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
