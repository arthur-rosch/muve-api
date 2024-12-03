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
exports.SubscriptionExpiredUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
const templates_1 = require("../../../templates");
const send_email_1 = require("../../../services/send-email");
const formatDate_1 = require("../../../utils/formatDate");
class SubscriptionExpiredUseCase {
    constructor(usersRepository, videoRepository, signaturesRepository) {
        this.usersRepository = usersRepository;
        this.videoRepository = videoRepository;
        this.signaturesRepository = signaturesRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, status, }) {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const signature = yield this.signaturesRepository.findByUserId(user.id);
            if (!signature) {
                throw new erros_1.NotFoundErros('Signature');
            }
            const newStatusSignature = yield this.signaturesRepository.updateStatusSignature(signature.id, status);
            const lateSignatureEmail = (0, templates_1.LateSignatureEmail)({
                name: user.name,
                expirationDate: (0, formatDate_1.formatDate)(newStatusSignature.next_charge_date),
                paymentLink: 'https://muveplayer.com/',
                value: newStatusSignature.price,
            });
            yield (0, send_email_1.sendEmail)({
                from: 'contato@muveplayer.com', // O remetente
                to: email, // O destinatário
                subject: 'Assinatura Atrasada Muve Player', // Assunto do email
                html: lateSignatureEmail,
            });
            return {
                user,
                signature: newStatusSignature,
            };
        });
    }
}
exports.SubscriptionExpiredUseCase = SubscriptionExpiredUseCase;
