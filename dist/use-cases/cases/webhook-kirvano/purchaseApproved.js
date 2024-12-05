"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseApprovedUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("../../../use-cases/erros");
const templates_1 = require("../../../templates");
const send_email_1 = require("../../../services/send-email");
class PurchaseApprovedUseCase {
    constructor(usersRepository, signaturesRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
    }
    async execute({ status, name, email, phone, document, password, plan, price, payment_method, chargeFrequency, next_charge_date, kirvano_type, kirvano_sale_id, kirvano_checkout_id, }) {
        const sendEmailPurchased = async () => {
            const purchaseEmail = (0, templates_1.PurchaseEmail)({
                name,
                password,
                login: email,
            });
            await (0, send_email_1.sendEmail)({
                from: 'contato@muveplayer.com', // O remetente
                to: email, // O destinatário
                subject: 'Compra aprovado Muve Player', // Assunto do email
                html: purchaseEmail,
            });
        };
        const password_hash = await (0, bcryptjs_1.hash)(password, 6);
        const userExist = await this.usersRepository.findByEmail(email);
        if (!userExist) {
            const user = await this.usersRepository.create({
                name,
                email,
                phone,
                document,
                password_hash,
            });
            const signature = await this.signaturesRepository.create({
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
            await sendEmailPurchased();
            return {
                user,
                signature,
            };
        }
        else {
            const lastSignature = await this.signaturesRepository.findByUserId(userExist.id);
            if (!lastSignature) {
                throw new erros_1.NotFoundErros('Signature');
            }
            await this.signaturesRepository.updateStatusSignature(lastSignature.id, 'CANCELED');
            const signature = await this.signaturesRepository.create({
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
    }
}
exports.PurchaseApprovedUseCase = PurchaseApprovedUseCase;
