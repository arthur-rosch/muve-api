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
exports.GenerateSignedUrlUseCase = void 0;
const env_1 = require("../../../env");
const jsonwebtoken_1 = require("jsonwebtoken");
class GenerateSignedUrlUseCase {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    execute(videoPlayerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                videoPlayerId,
                exp: Math.floor(Date.now() / 1000) + 300,
            };
            const secretKey = env_1.env.JWT_SECRET;
            const token = (0, jsonwebtoken_1.sign)(payload, secretKey);
            yield this.tokenRepository.createToken(token, videoPlayerId);
            const baseUrl = `https://seu-dominio.com/demo/player?videoPlayerId=${videoPlayerId}`;
            const signedUrl = `${baseUrl}&token=${token}`;
            return signedUrl;
        });
    }
}
exports.GenerateSignedUrlUseCase = GenerateSignedUrlUseCase;
