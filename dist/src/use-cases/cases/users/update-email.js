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
exports.UpdateEmailUseCase = void 0;
const bcryptjs_1 = require("bcryptjs");
const erros_1 = require("@/use-cases/erros");
class UpdateEmailUseCase {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, newEmail, password, }) {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new erros_1.InvalidCredentialsError();
            }
            const userNewEmail = yield this.usersRepository.findByEmail(newEmail);
            if (userNewEmail) {
                throw new erros_1.InvalidCredentialsError();
            }
            const doestPasswordMatches = yield (0, bcryptjs_1.compare)(password, user.password_hash);
            if (!doestPasswordMatches) {
                throw new erros_1.InvalidCredentialsError();
            }
            const newUser = yield this.usersRepository.update(user.id, Object.assign(Object.assign({}, user), { email: newEmail }));
            return {
                user: newUser,
            };
        });
    }
}
exports.UpdateEmailUseCase = UpdateEmailUseCase;
