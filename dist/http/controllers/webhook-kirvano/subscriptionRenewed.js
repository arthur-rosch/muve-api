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
exports.subscriptionRenewed = subscriptionRenewed;
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
const make_subscription_renewed_use_case_1 = require("../../../use-cases/factories/webhook-kirvano/make-subscription-renewed-use-case");
function subscriptionRenewed(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptionRenewedEventSchema = zod_1.z.object({
            event: zod_1.z.string(),
            status: zod_1.z.string(),
            payment_method: zod_1.z.string(),
            plan: zod_1.z.object({
                name: zod_1.z.string(),
                charge_frequency: zod_1.z.string(),
                next_charge_date: zod_1.z.string(),
            }),
            customer: zod_1.z.object({
                name: zod_1.z.string(),
                document: zod_1.z.string(),
                email: zod_1.z.string().email(),
                phone_number: zod_1.z.string(),
            }),
            type: zod_1.z.string(),
            sale_id: zod_1.z.string(),
            checkout_id: zod_1.z.string(),
            total_price: zod_1.z.string(),
            products: zod_1.z.array(zod_1.z.object({
                id: zod_1.z.string(),
                name: zod_1.z.string(),
                photo: zod_1.z.string().url(),
                price: zod_1.z.string(),
                offer_id: zod_1.z.string(),
                offer_name: zod_1.z.string(),
                description: zod_1.z.string(),
                is_order_bump: zod_1.z.boolean(),
            })),
        });
        const { event, plan, status, customer, sale_id, checkout_id, total_price, type, payment_method, products, } = subscriptionRenewedEventSchema.parse(request.body);
        try {
            if (event === 'SUBSCRIPTION_RENEWED') {
                const subscriptionsRenewedUseCase = (0, make_subscription_renewed_use_case_1.makeSubscriptionsRenewedUseCase)();
                const { subscriptionsRenewed } = yield subscriptionsRenewedUseCase.execute({
                    status,
                    email: customer.email,
                    payment_method,
                    price: total_price,
                    plan: products[0].offer_name,
                    chargeFrequency: plan.charge_frequency,
                    next_charge_date: plan.next_charge_date,
                    kirvano_type: type,
                    kirvano_sale_id: sale_id,
                    kirvano_checkout_id: checkout_id,
                });
                return reply.status(200).send({
                    subscriptionsRenewed,
                });
            }
        }
        catch (err) {
            if (err instanceof erros_1.NotFoundErros) {
                return reply.status(409).send({ message: err.message });
            }
            throw err;
        }
    });
}
