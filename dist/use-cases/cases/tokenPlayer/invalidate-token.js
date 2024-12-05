"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidateTokenUseCase = void 0;
class InvalidateTokenUseCase {
    constructor(tokenRepository) {
        this.tokenRepository = tokenRepository;
    }
    async execute(token) {
        await this.tokenRepository.invalidateToken(token);
    }
}
exports.InvalidateTokenUseCase = InvalidateTokenUseCase;
