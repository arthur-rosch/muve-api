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
exports.SubscriptionsRenewedUseCase = void 0;
const erros_1 = require("../../../use-cases/erros");
class SubscriptionsRenewedUseCase {
    constructor(usersRepository, signaturesRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ status, email, plan, price, payment_method, chargeFrequency, next_charge_date, kirvano_type, kirvano_sale_id, kirvano_checkout_id, }) {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const lastSignature = yield this.signaturesRepository.findByUserId(user.id);
            if (!lastSignature) {
                throw new erros_1.NotFoundErros('Signature');
            }
            yield this.signaturesRepository.updateStatusSignature(lastSignature.id, 'CANCELED');
            const subscriptionsRenewed = yield this.signaturesRepository.create({
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
        });
    }
}
exports.SubscriptionsRenewedUseCase = SubscriptionsRenewedUseCase;
