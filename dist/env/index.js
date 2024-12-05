"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    JWT_SECRET: zod_1.z.string().nonempty(),
    NODE_ENV: zod_1.z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: zod_1.z.coerce.number().default(3000),
    DB_HOST: zod_1.z.string().nonempty(),
    DB_USER: zod_1.z.string().nonempty(),
    DB_PASS: zod_1.z.string().nonempty(),
    DB_NAME: zod_1.z.string().nonempty(),
    DATABASE_URL: zod_1.z.string().url().nonempty(),
    DB_PORT: zod_1.z.coerce.number().default(25060),
    DB_SSLMODE: zod_1.z
        .enum(['disable', 'require', 'verify-ca', 'verify-full', 'prefer'])
        .default('require'),
    STRIPE_KEY: zod_1.z.string().nonempty(),
    STRIPE_SECRET_KEY: zod_1.z.string().nonempty(),
    STRIPE_SECRET_WEBHOOK_KEY: zod_1.z.string().nonempty(),
    STRIPE_PRICE_ID_ESSENCIAL: zod_1.z.string().nonempty(),
    STRIPE_PRICE_ID_PROFISSIONAL: zod_1.z.string().nonempty(),
    STRIPE_PRICE_ID_ILIMITADO: zod_1.z.string().nonempty(),
    PASS_EMAIL: zod_1.z.string().nonempty(),
    USER_EMAIL: zod_1.z.string().nonempty(),
    HOST_EMAIL: zod_1.z.string().nonempty(),
    PORT_EMAIL: zod_1.z.coerce.number().default(465),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format());
    throw new Error('❌ Invalid environment variables.');
}
exports.env = _env.data;
