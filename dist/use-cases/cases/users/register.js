"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("../../../use-cases/erros");
const lib_1 = require("../../../lib");
class RegisterUseCase {
    constructor(usersRepository, signatureRepository) {
        this.usersRepository = usersRepository;
        this.signatureRepository = signatureRepository;
    }
    async execute({ name, email, phone, password, document, }) {
        const password_hash = await (0, bcryptjs_1.hash)(password, 6);
        const userWithSameEmail = await this.usersRepository.findByEmail(email);
        if (userWithSameEmail) {
            throw new erros_1.UserAlreadyExistsError();
        }
        const customer = await lib_1.stripe.customers.create({
            email,
            phone,
            name,
        });
        const user = await this.usersRepository.create({
            name,
            email,
            phone,
            document,
            password_hash,
            stripeCustomersId: customer.id,
        });
        await this.signatureRepository.create({
            price: '0',
            plan: 'free',
            status: 'free',
            end_date: null,
            trial_end_date: null,
            ChargeFrequency: 'MONTHLY',
            stripe_subscription_id: 'N/A',
            stripe_customer_id: customer.id,
            user: { connect: { id: user.id } },
            payment_method: 'N/A',
            start_date: new Date(),
            next_charge_date: 'N/A',
        });
        return { user };
    }
}
exports.RegisterUseCase = RegisterUseCase;
