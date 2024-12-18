"use strict";
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
    async execute({ email, status, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const signature = await this.signaturesRepository.findByUserId(user.id);
        if (!signature) {
            throw new erros_1.NotFoundErros('Signature');
        }
        const newStatusSignature = await this.signaturesRepository.updateStatusSignature(signature.id, status.toLocaleLowerCase());
        const lateSignatureEmail = (0, templates_1.LateSignatureEmail)({
            name: user.name,
            expirationDate: (0, formatDate_1.formatDate)(newStatusSignature.next_charge_date),
            paymentLink: 'https://muveplayer.com/',
            value: newStatusSignature.price,
        });
        await (0, send_email_1.sendEmail)({
            from: 'contato@muveplayer.com', // O remetente
            to: email, // O destinatário
            subject: 'Assinatura Atrasada Muve Player', // Assunto do email
            html: lateSignatureEmail,
        });
        return {
            user,
            signature: newStatusSignature,
        };
    }
}
exports.SubscriptionExpiredUseCase = SubscriptionExpiredUseCase;
