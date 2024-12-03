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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyJwt(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = request.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            console.log(token);
            if (!token) {
                return reply.status(401).send({ message: 'Unauthorized' });
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            request.user = { sub: decoded.sub, role: decoded.role };
        }
        catch (err) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }
    });
}
