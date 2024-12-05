import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  JWT_SECRET: z.string().nonempty(),

  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),

  PORT: z.coerce.number().default(3000),

  DB_HOST: z.string().nonempty(),
  DB_USER: z.string().nonempty(),
  DB_PASS: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DATABASE_URL: z.string().url().nonempty(),
  DB_PORT: z.coerce.number().default(25060),
  DB_SSLMODE: z
    .enum(['disable', 'require', 'verify-ca', 'verify-full', 'prefer'])
    .default('require'),

  STRIPE_KEY: z.string().nonempty(),
  STRIPE_SECRET_KEY: z.string().nonempty(),
  STRIPE_SECRET_WEBHOOK_KEY: z.string().nonempty(),

  STRIPE_PRICE_ID_ESSENCIAL: z.string().nonempty(),
  STRIPE_PRICE_ID_PROFISSIONAL: z.string().nonempty(),
  STRIPE_PRICE_ID_ILIMITADO: z.string().nonempty(),

  PASS_EMAIL: z.string().nonempty(),
  USER_EMAIL: z.string().nonempty(),
  HOST_EMAIL: z.string().nonempty(),
  PORT_EMAIL: z.coerce.number().default(465),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('❌ Invalid environment variables.');
}

export const env = _env.data;
