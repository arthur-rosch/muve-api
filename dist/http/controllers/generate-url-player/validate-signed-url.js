"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignedUrl = validateSignedUrl;
const crypto_1 = __importDefault(require("crypto"));
const make_validate_signed_url_use_case_1 = require("../../../use-cases/factories/tokenPlayer/make-validate-signed-url-use-case");
const algorithm = 'aes-256-cbc';
const secretKey = 'teste';
const iv = crypto_1.default.randomBytes(16);
function extractParamsFromUrl(url) {
    const urlObj = new URL(url);
    const videoPlayerId = urlObj.searchParams.get('videoPlayerId');
    const token = urlObj.searchParams.get('token');
    return { videoPlayerId, token };
}
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}
function decrypt(text) {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
async function validateSignedUrl(request, reply) {
    const { url } = request.body;
    if (!url) {
        return reply.status(400).send({ message: 'URL is required' });
    }
    const decryptedUrl = decrypt(url);
    const { videoPlayerId, token } = extractParamsFromUrl(decryptedUrl);
    if (!videoPlayerId || !token) {
        return reply.status(400).send({ message: 'Missing videoPlayerId or token' });
    }
    try {
        const validateSignedUrlUseCase = (0, make_validate_signed_url_use_case_1.makeValidateSignedUrlUseCase)();
        const isValid = await validateSignedUrlUseCase.execute(videoPlayerId, token);
        if (isValid) {
            const encryptedVideoUrl = encrypt(decryptedUrl); // Criptografa a URL para enviar ao frontend
            return reply
                .status(200)
                .send({ message: 'Token valid', encryptedVideoUrl });
        }
        else {
            return reply.status(403).send({ message: 'Invalid or expired token' });
        }
    }
    catch (err) {
        return reply.status(500).send({ message: err.message });
    }
}
