"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateSignedUrlUseCase = void 0;
const env_1 = require("../../../env");
const jsonwebtoken_1 = require("jsonwebtoken");
class GenerateSignedUrlUseCase {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async execute(videoPlayerId) {
        const payload = {
            videoPlayerId,
            exp: Math.floor(Date.now() / 1000) + 300,
        };
        const secretKey = env_1.env.JWT_SECRET;
        const token = (0, jsonwebtoken_1.sign)(payload, secretKey);
        await this.tokenRepository.createToken(token, videoPlayerId);
        const baseUrl = `https://seu-dominio.com/demo/player?videoPlayerId=${videoPlayerId}`;
        const signedUrl = `${baseUrl}&token=${token}`;
        return signedUrl;
    }
}
exports.GenerateSignedUrlUseCase = GenerateSignedUrlUseCase;
