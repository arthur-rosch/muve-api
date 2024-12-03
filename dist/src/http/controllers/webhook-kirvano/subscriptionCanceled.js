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
exports.subscriptionCanceled = subscriptionCanceled;
const zod_1 = require("zod");
const erros_1 = require("@/use-cases/erros");
const make_subscription_canceled_use_case_1 = require("@/use-cases/factories/webhook-kirvano/make-subscription-canceled-use-case");
function subscriptionCanceled(request, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const subscriptionCanceledEventSchema = zod_1.z.object({
            event: zod_1.z.string(),
            status: zod_1.z.string(),
            customer: zod_1.z.object({
                name: zod_1.z.string(),
                document: zod_1.z.string(),
                email: zod_1.z.string().email(),
                phone_number: zod_1.z.string(),
            }),
        });
        const { event, status, customer } = subscriptionCanceledEventSchema.parse(request.body);
        try {
            if (event === 'SUBSCRIPTION_CANCELED') {
                const subscriptionCanceledUseCase = (0, make_subscription_canceled_use_case_1.makeSubscriptionCanceledUseCase)();
                const { signature, user } = yield subscriptionCanceledUseCase.execute({
                    status,
                    email: customer.email,
                });
                return reply.status(200).send({
                    signature,
                    user,
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
