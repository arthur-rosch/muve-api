"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStripeCheckoutUseCase = void 0;
const lib_1 = require("../../../lib");
const utils_1 = require("../../../utils");
const erros_1 = require("../../erros");
class CreateStripeCheckoutUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async execute({ email, plan, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const priceId = (0, utils_1.planMappingStripe)(plan);
        const { url } = await lib_1.stripe.checkout.sessions.create({
            success_url: 'https://web.muveplayer.com/thanks',
            line_items: [
                {
                    quantity: 1,
                    price: priceId,
                },
            ],
            customer: user.stripeCustomersId,
            client_reference_id: user.id,
            payment_method_types: ['card'],
            phone_number_collection: {
                enabled: true,
            },
            mode: 'subscription',
            subscription_data: {
                trial_period_days: 7,
            },
        });
        return {
            checkoutUrl: url,
        };
    }
}
exports.CreateStripeCheckoutUseCase = CreateStripeCheckoutUseCase;
