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

// src/use-cases/erros/index.ts
var erros_exports = {};
__export(erros_exports, {
  AccessDeniedError: () => AccessDeniedError,
  EmailVerificationNotFoundError: () => EmailVerificationNotFoundError,
  InvalidCredentialsError: () => InvalidCredentialsError,
  InvalidVerificationCodeError: () => InvalidVerificationCodeError,
  LateSubscriptionError: () => LateSubscriptionError,
  NotFoundErros: () => NotFoundErros,
  SubscriptionCancelledError: () => SubscriptionCancelledError,
  SubscriptionPausedError: () => SubscriptionPausedError,
  UserAlreadyExistsError: () => UserAlreadyExistsError
});
module.exports = __toCommonJS(erros_exports);

// src/use-cases/erros/not-found-error.ts
var NotFoundErros = class extends Error {
  constructor(text) {
    super(`${text} not found`);
  }
};

// src/use-cases/erros/access-denied-error.ts
var AccessDeniedError = class extends Error {
  constructor(resource) {
    super(`Access denied to ${resource}`);
    this.name = "AccessDeniedError";
  }
};

// src/use-cases/erros/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/erros/user-already-exists-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("E-mail already exists.");
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

// src/use-cases/erros/invalid-verification-code-error.ts
var InvalidVerificationCodeError = class extends Error {
  constructor() {
    super("C\xF3digo inv\xE1lido ou email n\xE3o encontrado.");
    this.name = "InvalidVerificationCodeError";
  }
};

// src/use-cases/erros/email-verification-not-found-error.ts
var EmailVerificationNotFoundError = class extends Error {
  constructor() {
    super("Email verification not found or not verified.");
    this.name = "EmailVerificationNotFoundError";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AccessDeniedError,
  EmailVerificationNotFoundError,
  InvalidCredentialsError,
  InvalidVerificationCodeError,
  LateSubscriptionError,
  NotFoundErros,
  SubscriptionCancelledError,
  SubscriptionPausedError,
  UserAlreadyExistsError
});
