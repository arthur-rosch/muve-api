"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSignedUrlUseCase = void 0;
const env_1 = require("../../../env");
const jsonwebtoken_1 = require("jsonwebtoken");
class ValidateSignedUrlUseCase {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async execute(videoPlayerId, token) {
        const isValid = await this.tokenRepository.isTokenValid(token);
        if (!isValid) {
            return false;
        }
        try {
            const secretKey = env_1.env.JWT_SECRET;
            const decoded = (0, jsonwebtoken_1.verify)(token, secretKey);
            return (decoded.videoPlayerId === videoPlayerId &&
                decoded.exp > Math.floor(Date.now() / 1000));
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                return false;
            }
            throw error;
        }
    }
}
exports.ValidateSignedUrlUseCase = ValidateSignedUrlUseCase;
