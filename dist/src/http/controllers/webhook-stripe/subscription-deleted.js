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
exports.subscriptionDeleted = subscriptionDeleted;
const erros_1 = require("@/use-cases/erros");
const make_subscription_deleted_use_case_1 = require("@/use-cases/factories/webhook-stripe/make-subscription-deleted-use-case");
function subscriptionDeleted(reply, request, object) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subscriptionDeletedUseCase = (0, make_subscription_deleted_use_case_1.makeSubscriptionDeletedUseCase)();
            const { updatedSignature } = yield subscriptionDeletedUseCase.execute({
                subscriptionId: object.id,
            });
            return reply.status(200).send({
                updatedSignature,
            });
        }
        catch (err) {
            if (err instanceof erros_1.NotFoundErros) {
                return reply.status(409).send({ message: err.message });
            }
            throw err;
        }
    });
}
