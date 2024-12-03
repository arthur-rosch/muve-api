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
exports.AuthenticateUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("@/use-cases/erros");
class AuthenticateUseCase {
    constructor(usersRepository, signaturesRepository, emailVerificationRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
        this.emailVerificationRepository = emailVerificationRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, }) {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new erros_1.NotFoundErros('User');
            }
            const doestPasswordMatches = yield (0, bcryptjs_1.compare)(password, user.password_hash);
            console.log(doestPasswordMatches);
            if (!doestPasswordMatches) {
                throw new erros_1.InvalidCredentialsError();
            }
            const signature = yield this.signaturesRepository.checkStatusSignature(user.id);
            if (!signature) {
                throw new erros_1.NotFoundErros('Subscription');
            }
            if (signature.status === 'canceled') {
                throw new erros_1.SubscriptionCancelledError();
            }
            if (signature.status === 'pending') {
                throw new erros_1.LateSubscriptionError();
            }
            const { isVerified } = yield this.emailVerificationRepository.findByEmail(user.email);
            if (!isVerified) {
                throw new erros_1.EmailVerificationNotFoundError();
            }
            if (signature.status === 'free') {
                return {
                    user,
                    signature,
                };
            }
            const currentDate = new Date();
            const nextChargeDate = new Date(signature.next_charge_date);
            if (currentDate > nextChargeDate) {
                yield this.signaturesRepository.updateStatusSignature(user.id, 'PAUSED');
                throw new erros_1.SubscriptionPausedError();
            }
            return {
                user,
                signature,
            };
        });
    }
}
exports.AuthenticateUseCase = AuthenticateUseCase;
