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
import { register } from './http/controllers/users/register'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

const corsOptions = {
  origin: (origin, callback) => {
    console.log('Entrei aqui no CORS')
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

app.register(fastifyCors, corsOptions)
console.log('Entrei aqui no AppRegister')
app.register(usersRoutes, { prefix: '/api' })
app.register(videosRoutes, { prefix: '/api' })
app.register(foldersRoutes, { prefix: '/api' })
app.register(analyticsRoutes, { prefix: '/api' })
app.register(signatureRoutes, { prefix: '/api' })
app.register(webhookKirvanoRoutes, { prefix: '/api' })
app.register(generateUrlPlayerRoutes, { prefix: '/api' })

app.get('/', async (request, reply) => {
  console.log('rota base chamada')
  return { message: 'MUVE PLAYER ON' }
})

app.post('/register', async (request, reply) => {
  console.log('rota register')
  // eslint-disable-next-line no-unused-expressions
  register
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
  console.log('Error aqui, ', error)
  return reply
    .status(500)
    .send({ message: 'Internal server error.', error, _, reply })
})
