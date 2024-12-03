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
exports.PrismaTokenPlayerRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaTokenPlayerRepository {
    createToken(token, videoPlayerId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.token.create({
                data: {
                    token,
                    videoPlayerId,
                    isValid: true,
                },
            });
        });
    }
    invalidateToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.token.updateMany({
                where: { token },
                data: { isValid: false },
            });
        });
    }
    isTokenValid(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenRecord = yield prisma_1.prisma.token.findUnique({
                where: { token },
            });
            return !!tokenRecord && tokenRecord.isValid;
        });
    }
}
exports.PrismaTokenPlayerRepository = PrismaTokenPlayerRepository;
