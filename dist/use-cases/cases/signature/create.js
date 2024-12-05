"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSignatureUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class CreateSignatureUseCase {
    constructor(usersRepository, signaturesRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
    }
    async execute({ userId, plan, price, payment_method, chargeFrequency, next_charge_date, kirvano_type, kirvano_sale_id, kirvano_checkout_id, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const signature = await this.signaturesRepository.create({
            price,
            payment_method,
            status: 'ACTIVE',
            plan: '',
            kirvano_type,
            kirvano_sale_id,
            kirvano_checkout_id,
            next_charge_date,
            ChargeFrequency: chargeFrequency,
            user: {
                connect: {
                    id: userId,
                },
            },
        });
        return {
            signature,
        };
    }
}
exports.CreateSignatureUseCase = CreateSignatureUseCase;
