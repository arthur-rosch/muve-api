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
exports.PrismaLeadsRepository = void 0;
const prisma_1 = require("../../lib/prisma");
class PrismaLeadsRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield prisma_1.prisma.lead.create({
                data,
            });
            return folder;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield prisma_1.prisma.lead.findUnique({
                where: {
                    id,
                },
            });
            if (!lead) {
                return null;
            }
            return lead;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.lead.findFirst({
                where: {
                    email,
                },
            });
            if (!user) {
                return null;
            }
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lead = yield prisma_1.prisma.lead.delete({
                where: {
                    id,
                },
            });
            return lead;
        });
    }
}
exports.PrismaLeadsRepository = PrismaLeadsRepository;
