var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/use-cases/cases/email-verification/validation-code.ts
var validation_code_exports = {};
__export(validation_code_exports, {
  ValidationCodeCodeUseCase: () => ValidationCodeCodeUseCase
});
module.exports = __toCommonJS(validation_code_exports);

// src/use-cases/erros/invalid-verification-code-error.ts
var InvalidVerificationCodeError = class extends Error {
  constructor() {
    super("C\xF3digo inv\xE1lido ou email n\xE3o encontrado.");
    this.name = "InvalidVerificationCodeError";
  }
};

// src/use-cases/cases/email-verification/validation-code.ts
var ValidationCodeCodeUseCase = class {
  constructor(emailVerificationRepository) {
    this.emailVerificationRepository = emailVerificationRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      code
    }) {
      const verification = yield this.emailVerificationRepository.findByEmail(
        email
      );
      if (!verification || verification.code !== code) {
        throw new InvalidVerificationCodeError();
      }
      const { isVerified } = yield this.emailVerificationRepository.updateVerificationStatus(email);
      return {
        status: isVerified
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ValidationCodeCodeUseCase
});
