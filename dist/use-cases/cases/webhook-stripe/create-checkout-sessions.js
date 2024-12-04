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
exports.CreateStripeCheckoutUseCase = void 0;
const lib_1 = require("../../../lib");
const utils_1 = require("../../../utils");
const erros_1 = require("../../erros");
class CreateStripeCheckoutUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, plan, }) {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const priceId = (0, utils_1.planMappingStripe)(plan);
            const { url } = yield lib_1.stripe.checkout.sessions.create({
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
        });
    }
}
exports.CreateStripeCheckoutUseCase = CreateStripeCheckoutUseCase;
