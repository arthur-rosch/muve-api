"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSignatureMiddleware = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkSignatureMiddleware = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
    if (!userId) {
        return reply.status(401).send({ message: 'Usuário não autenticado.' });
    }
    try {
        const signature = yield prisma.signature.findFirst({
            where: {
                userId,
            },
            orderBy: {
                created_at: 'desc',
            },
        });
        if (!signature) {
            return reply.status(401).send({ message: 'Usuário sem Plano' });
        }
        if (signature.status === 'canceled') {
            return reply.status(403).send({ message: 'Assinatura cancelada.' });
        }
        if (signature.status === 'past_due') {
            return reply
                .status(403)
                .send({ message: 'Assinatura com pagamento atrasado.' });
        }
        if (signature.status === 'trialing') {
            const trialEndDate = signature.trial_end_date;
            if (trialEndDate && new Date(trialEndDate) < new Date()) {
                return reply.status(403).send({ message: 'Período de teste expirado.' });
            }
        }
        if (signature.status !== 'active' &&
            signature.status !== 'trialing' &&
            signature.status !== 'free') {
            return reply.status(403).send({ message: 'Assinatura inválida.' });
        }
    }
    catch (error) {
        console.error('Erro ao verificar assinatura:', error);
        reply.status(500).send({ message: 'Erro interno do servidor.' });
    }
});
exports.checkSignatureMiddleware = checkSignatureMiddleware;
exports.default = exports.checkSignatureMiddleware;