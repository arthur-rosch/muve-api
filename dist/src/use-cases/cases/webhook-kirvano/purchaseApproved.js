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
exports.PurchaseApprovedUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("@/use-cases/erros");
const templates_1 = require("@/templates");
const send_email_1 = require("@/services/send-email");
class PurchaseApprovedUseCase {
    constructor(usersRepository, signaturesRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ status, name, email, phone, document, password, plan, price, payment_method, chargeFrequency, next_charge_date, kirvano_type, kirvano_sale_id, kirvano_checkout_id, }) {
            const sendEmailPurchased = () => __awaiter(this, void 0, void 0, function* () {
                const purchaseEmail = (0, templates_1.PurchaseEmail)({
                    name,
                    password,
                    login: email,
                });
                yield (0, send_email_1.sendEmail)({
                    from: 'contato@muveplayer.com', // O remetente
                    to: email, // O destinatário
                    subject: 'Compra aprovado Muve Player', // Assunto do email
                    html: purchaseEmail,
                });
            });
            const password_hash = yield (0, bcryptjs_1.hash)(password, 6);
            const userExist = yield this.usersRepository.findByEmail(email);
            if (!userExist) {
                const user = yield this.usersRepository.create({
                    name,
                    email,
                    phone,
                    document,
                    password_hash,
                });
                const signature = yield this.signaturesRepository.create({
                    price,
                    payment_method,
                    plan: '',
                    status,
                    kirvano_type,
                    kirvano_sale_id,
                    kirvano_checkout_id,
                    next_charge_date,
                    ChargeFrequency: chargeFrequency,
                    user: {
                        connect: {
                            id: user.id,
                        },
                    },
                });
                user.password_hash = '';
                yield sendEmailPurchased();
                return {
                    user,
                    signature,
                };
            }
            else {
                const lastSignature = yield this.signaturesRepository.findByUserId(userExist.id);
                if (!lastSignature) {
                    throw new erros_1.NotFoundErros('Signature');
                }
                yield this.signaturesRepository.updateStatusSignature(lastSignature.id, 'CANCELED');
                const signature = yield this.signaturesRepository.create({
                    price,
                    payment_method,
                    plan: '',
                    status,
                    kirvano_type,
                    kirvano_sale_id,
                    kirvano_checkout_id,
                    next_charge_date,
                    ChargeFrequency: chargeFrequency,
                    user: {
                        connect: {
                            id: userExist.id,
                        },
                    },
                });
                userExist.password_hash = '';
                sendEmailPurchased();
                return {
                    user: userExist,
                    signature,
                };
            }
        });
    }
}
exports.PurchaseApprovedUseCase = PurchaseApprovedUseCase;
