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
exports.SubscriptionCanceledUseCase = void 0;
const erros_1 = require("@/use-cases/erros");
const templates_1 = require("@/templates");
const send_email_1 = require("@/services/send-email");
class SubscriptionCanceledUseCase {
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
            const unsubscribe = (0, templates_1.UnsubscribeEmail)({
                name: user.name,
            });
            yield (0, send_email_1.sendEmail)({
                from: 'contato@muveplayer.com',
                to: email,
                subject: 'Assinatura Cancelada Muve player',
                html: unsubscribe,
            });
            return {
                user,
                signature: newStatusSignature,
            };
        });
    }
}
exports.SubscriptionCanceledUseCase = SubscriptionCanceledUseCase;
