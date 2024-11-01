import { env } from './env'
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import fastifyRawBody from 'fastify-raw-body'

import {
  usersRoutes,
  videosRoutes,
  foldersRoutes,
  analyticsRoutes,
  generateUrlPlayerRoutes,
  webhookKirvanoRoutes,
  signatureRoutes,
} from './http/controllers'
import { webhookStripeRoutes } from './http/controllers/webhook-stripe/routes'
import { leadsRoutes } from './http/controllers/lead/routes'

export const app = fastify()
app.register(fastifyRawBody, {
  global: false, // Para ativar apenas em rotas específicas
  field: 'rawBody', // Campo que armazenará o corpo bruto
  encoding: 'utf8', // Codificação opcional
  runFirst: true, // Garante que este plugin seja executado antes do body-parser
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
      'https://muve-web-ejgxefe0hdgrgaf3.brazilsouth-01.azurewebsites.net',
    ]

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true) // Permite a origem
    } else {
      callback(new Error('Not allowed by CORS')) // Rejeita a origem
    }
  },
}

app.register(fastifyCors, corsOptions)
app.register(usersRoutes, { prefix: '/api' })
app.register(leadsRoutes, { prefix: '/api' })
app.register(videosRoutes, { prefix: '/api' })
app.register(foldersRoutes, { prefix: '/api' })
app.register(analyticsRoutes, { prefix: '/api' })
app.register(signatureRoutes, { prefix: '/api' })
app.register(webhookKirvanoRoutes, { prefix: '/api' })
app.register(generateUrlPlayerRoutes, { prefix: '/api' })

app.register(async (instance) => {
  instance.addHook('preValidation', (request, reply, done) => {
    // Habilita o `rawBody` para esta rota
    request.rawBody = request.rawBody || '' // Inicializa caso não exista
    done()
  })
  instance.register(webhookStripeRoutes, { prefix: '/api' })
app.get('/', async (request, reply) => {
  return { message: 'MUVE PLAYER ON' }
})

app.setErrorHandler((error, _, reply) => {
  console.error('Erro ocorrido:', error)
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
  return reply.status(500).send({ message: 'Internal server error.', error })
})
