import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().nonempty(),
  JWT_SECRET: z.string().nonempty(),
  DB_HOST: z.string().nonempty(),
  DB_PORT: z.coerce.number().default(25060),
  DB_USER: z.string().nonempty(),
  DB_PASS: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  STRIPE_KEY: z.string().nonempty(),
  STRIPE_SECRET_KEY: z.string().nonempty(),
  DB_SSLMODE: z
    .enum(['disable', 'require', 'verify-ca', 'verify-full', 'prefer'])
    .default('require'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('❌ Invalid environment variables.')
}

export const env = _env.data
