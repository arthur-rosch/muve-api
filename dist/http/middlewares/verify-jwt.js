"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = verifyJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function verifyJwt(request, reply) {
    try {
        const token = request.headers.authorization?.split(" ")[1];
        console.log(token);
        if (!token) {
            return reply.status(401).send({ message: "Unauthorized" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        request.user = { sub: decoded.sub, role: decoded.role };
    }
    catch (err) {
        return reply.status(401).send({ message: "Unauthorized" });
    }
}
