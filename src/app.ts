import { env } from './env'
import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import {
  usersRoutes,
  videosRoutes,
  foldersRoutes,
  analyticsRoutes,
  generateUrlPlayerRoutes,
} from './http/controllers'

export const app = fastify()

// Configuração do JWT
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '7d',
  },
})

// Configuração de Cookies e CORS
app.register(fastifyCookie)
app.register(fastifyCors, {
  origin: '*',
})

// Registro das rotas
app.register(usersRoutes, { prefix: '/api' })
app.register(videosRoutes, { prefix: '/api' })
app.register(foldersRoutes, { prefix: '/api' })
app.register(analyticsRoutes, { prefix: '/api' })
app.register(generateUrlPlayerRoutes, { prefix: '/api' })

// Manipulador de erros
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
