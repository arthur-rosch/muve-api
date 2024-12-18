"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionCanceledUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
const templates_1 = require("../../../templates");
const send_email_1 = require("../../../services/send-email");
class SubscriptionCanceledUseCase {
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
        const unsubscribe = (0, templates_1.UnsubscribeEmail)({
            name: user.name,
        });
        await (0, send_email_1.sendEmail)({
            from: 'contato@muveplayer.com',
            to: email,
            subject: 'Assinatura Cancelada Muve player',
            html: unsubscribe,
        });
        return {
            user,
            signature: newStatusSignature,
        };
    }
}
exports.SubscriptionCanceledUseCase = SubscriptionCanceledUseCase;
