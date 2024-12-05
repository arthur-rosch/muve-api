"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("./cron");
const env_1 = require("./env");
const fastify_1 = __importDefault(require("fastify"));
const zod_1 = require("zod");
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_raw_body_1 = __importDefault(require("fastify-raw-body"));
const controllers_1 = require("./http/controllers");
exports.app = (0, fastify_1.default)();
exports.app.register(fastify_raw_body_1.default, {
    global: false,
    runFirst: true,
    field: 'rawBody',
    encoding: 'utf8',
});
exports.app.register(jwt_1.default, {
    secret: env_1.env.JWT_SECRET,
    sign: {
        expiresIn: '7d',
    },
});
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'https://web.muveplayer.com',
            'http://localhost:8080',
            'https://muve-dev.vercel.app',
            'https://muve-prod.vercel.app',
            'https://seahorse-app-2xtkj.ondigitalocean.app',
        ];
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
};
exports.app.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
    try {
        const json = JSON.parse(body);
        done(null, json);
    }
    catch (err) {
        err.statusCode = 400;
        done(err, undefined);
    }
});
exports.app.register(cors_1.default, corsOptions);
exports.app.register(controllers_1.usersRoutes, { prefix: '/api' });
exports.app.register(controllers_1.leadsRoutes, { prefix: '/api' });
exports.app.register(controllers_1.videosRoutes, { prefix: '/api' });
exports.app.register(controllers_1.foldersRoutes, { prefix: '/api' });
exports.app.register(controllers_1.analyticsRoutes, { prefix: '/api' });
exports.app.register(controllers_1.signatureRoutes, { prefix: '/api' });
exports.app.register(controllers_1.webhookKirvanoRoutes, { prefix: '/api' });
exports.app.register(controllers_1.emailVerificationRoutes, { prefix: '/api' });
exports.app.register(controllers_1.generateUrlPlayerRoutes, { prefix: '/api' });
exports.app.register(async (instance) => {
    instance.addHook('preValidation', (request, reply, done) => {
        request.rawBody = request.rawBody || '';
        done();
    });
    instance.register(controllers_1.webhookStripeRoutes, { prefix: '/api' });
});
exports.app.setErrorHandler((error, _, reply) => {
    if (error instanceof zod_1.ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation error', issues: error.format() });
    }
    if (env_1.env.NODE_ENV !== 'production') {
        console.error(error);
    }
    else {
        // TODO: Aqui devemos registrar o erro em uma ferramenta externa como Datadog/NewRelic/Sentry
    }
    return reply.status(500).send({ message: 'Internal server error.' });
});
