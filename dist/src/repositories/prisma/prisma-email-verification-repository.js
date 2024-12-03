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
exports.PrismaEmailVerificationRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PrismaEmailVerificationRepository {
    create(email, code) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.emailVerification.create({
                data: { email, code },
            });
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.emailVerification.findUnique({
                where: { email },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.emailVerification.findUnique({
                where: { id },
            });
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.emailVerification.findFirst({
                where: { code },
            });
        });
    }
    updateVerificationStatus(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.emailVerification.update({
                where: { email },
                data: { isVerified: true },
            });
        });
    }
    updateCode(email, code) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.emailVerification.update({
                where: { email },
                data: { code },
            });
        });
    }
}
exports.PrismaEmailVerificationRepository = PrismaEmailVerificationRepository;
