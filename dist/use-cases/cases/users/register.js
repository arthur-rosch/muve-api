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
exports.RegisterUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("../../../use-cases/erros");
const lib_1 = require("../../../lib");
class RegisterUseCase {
    constructor(usersRepository, signatureRepository) {
        this.usersRepository = usersRepository;
        this.signatureRepository = signatureRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, phone, password, document, }) {
            const password_hash = yield (0, bcryptjs_1.hash)(password, 6);
            const userWithSameEmail = yield this.usersRepository.findByEmail(email);
            if (userWithSameEmail) {
                throw new erros_1.UserAlreadyExistsError();
            }
            const customer = yield lib_1.stripe.customers.create({
                email,
                phone,
                name,
            });
            const user = yield this.usersRepository.create({
                name,
                email,
                phone,
                document,
                password_hash,
                stripeCustomersId: customer.id,
            });
            yield this.signatureRepository.create({
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
        });
    }
}
exports.RegisterUseCase = RegisterUseCase;
