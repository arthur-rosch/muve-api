"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsRenewedUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class SubscriptionsRenewedUseCase {
    constructor(usersRepository, signaturesRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
    }
    async execute({ status, email, plan, price, payment_method, chargeFrequency, next_charge_date, kirvano_type, kirvano_sale_id, kirvano_checkout_id, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const lastSignature = await this.signaturesRepository.findByUserId(user.id);
        if (!lastSignature) {
            throw new erros_1.NotFoundErros('Signature');
        }
        await this.signaturesRepository.updateStatusSignature(lastSignature.id, 'CANCELED');
        const subscriptionsRenewed = await this.signaturesRepository.create({
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
        return {
            subscriptionsRenewed,
        };
    }
}
exports.SubscriptionsRenewedUseCase = SubscriptionsRenewedUseCase;
