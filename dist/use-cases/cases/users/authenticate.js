"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("../../../use-cases/erros");
class AuthenticateUseCase {
    constructor(usersRepository, signaturesRepository, emailVerificationRepository) {
        this.usersRepository = usersRepository;
        this.signaturesRepository = signaturesRepository;
        this.emailVerificationRepository = emailVerificationRepository;
    }
    async execute({ email, password, }) {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new erros_1.NotFoundErros('User');
        }
        const doestPasswordMatches = await (0, bcryptjs_1.compare)(password, user.password_hash);
        console.log(doestPasswordMatches);
        if (!doestPasswordMatches) {
            throw new erros_1.InvalidCredentialsError();
        }
        const signature = await this.signaturesRepository.checkStatusSignature(user.id);
        if (!signature) {
            throw new erros_1.NotFoundErros('Subscription');
        }
        if (signature.status === 'canceled') {
            throw new erros_1.SubscriptionCancelledError();
        }
        if (signature.status === 'pending') {
            throw new erros_1.LateSubscriptionError();
        }
        const emailVerification = await this.emailVerificationRepository.findByEmail(user.email);
        if (!emailVerification) {
            throw new erros_1.EmailVerificationNotFoundError();
        }
        if (!emailVerification.isVerified) {
            throw new erros_1.EmailVerificationNotFoundError();
        }
        return {
            user,
            signature,
        };
    }
}
exports.AuthenticateUseCase = AuthenticateUseCase;
