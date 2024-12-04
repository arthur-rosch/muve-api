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
exports.createStripeCheckout = createStripeCheckout;
const make_create_checkout_sessions_use_case_1 = require("../../../use-cases/factories/webhook-stripe/make-create-checkout-sessions-use-case");
const zod_1 = require("zod");
const erros_1 = require("../../../use-cases/erros");
function createStripeCheckout(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const createStripeBodySchema = zod_1.z.object({
            plan: zod_1.z.string(),
            email: zod_1.z.string().email(),
        });
        const { email, plan } = createStripeBodySchema.parse(request.body);
        try {
            const createStripeCheckoutUseCase = (0, make_create_checkout_sessions_use_case_1.makeCreateStripeCheckoutUseCase)();
            const { checkoutUrl } = yield createStripeCheckoutUseCase.execute({
                email,
                plan,
            });
            return reply.status(200).send({ checkoutUrl });
        }
        catch (err) {
            if (err instanceof erros_1.NotFoundErros) {
                return reply.status(404).send({ message: err.message });
            }
            throw err;
        }
    });
}
