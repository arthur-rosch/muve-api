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

// src/use-cases/cases/users/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateUseCase: () => AuthenticateUseCase
});
module.exports = __toCommonJS(authenticate_exports);
var import_bcryptjs = require("bcryptjs");

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

// src/use-cases/erros/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/erros/late-signature-error.ts
var LateSubscriptionError = class extends Error {
  constructor() {
    super(`Late Subscription. Renew your plan to gain access`);
    this.name = "LateSubscriptionError";
  }
};

// src/use-cases/erros/subscription-canceled-error.ts
var SubscriptionCancelledError = class extends Error {
  constructor() {
    super(`Subscription cancelled, Subscribe to a plan to gain access`);
    this.name = "SubscriptionCancelledError";
  }
};

// src/use-cases/erros/subscription-paused-error.ts
var SubscriptionPausedError = class extends Error {
  constructor() {
    super("Subscription is paused due to overdue next charge date.");
    this.name = "SubscriptionPausedError";
  }
};

// src/use-cases/erros/email-verification-not-found-error.ts
var EmailVerificationNotFoundError = class extends Error {
  constructor() {
    super("Email verification not found or not verified.");
    this.name = "EmailVerificationNotFoundError";
  }
};

// src/use-cases/cases/users/authenticate.ts
var AuthenticateUseCase = class {
  constructor(usersRepository, signaturesRepository, emailVerificationRepository) {
    this.usersRepository = usersRepository;
    this.signaturesRepository = signaturesRepository;
    this.emailVerificationRepository = emailVerificationRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      password
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new NotFoundErros("User");
      }
      const doestPasswordMatches = yield (0, import_bcryptjs.compare)(password, user.password_hash);
      console.log(doestPasswordMatches);
      if (!doestPasswordMatches) {
        throw new InvalidCredentialsError();
      }
      const signature = yield this.signaturesRepository.checkStatusSignature(
        user.id
      );
      if (!signature) {
        throw new NotFoundErros("Subscription");
      }
      if (signature.status === "canceled") {
        throw new SubscriptionCancelledError();
      }
      if (signature.status === "pending") {
        throw new LateSubscriptionError();
      }
      const { isVerified } = yield this.emailVerificationRepository.findByEmail(
        user.email
      );
      if (!isVerified) {
        throw new EmailVerificationNotFoundError();
      }
      if (signature.status === "free") {
        return {
          user,
          signature
        };
      }
      const currentDate = /* @__PURE__ */ new Date();
      const nextChargeDate = new Date(signature.next_charge_date);
      if (currentDate > nextChargeDate) {
        yield this.signaturesRepository.updateStatusSignature(user.id, "PAUSED");
        throw new SubscriptionPausedError();
      }
      return {
        user,
        signature
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUseCase
});
