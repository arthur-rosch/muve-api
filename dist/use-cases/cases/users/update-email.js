var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// src/use-cases/cases/users/update-email.ts
var update_email_exports = {};
__export(update_email_exports, {
  UpdateEmailUseCase: () => UpdateEmailUseCase
});
module.exports = __toCommonJS(update_email_exports);
var import_bcryptjs = require("bcryptjs");

// src/use-cases/erros/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/cases/users/update-email.ts
var UpdateEmailUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  execute(_0) {
    return __async(this, arguments, function* ({
      email,
      newEmail,
      password
    }) {
      const user = yield this.usersRepository.findByEmail(email);
      if (!user) {
        throw new InvalidCredentialsError();
      }
      const userNewEmail = yield this.usersRepository.findByEmail(newEmail);
      if (userNewEmail) {
        throw new InvalidCredentialsError();
      }
      const doestPasswordMatches = yield (0, import_bcryptjs.compare)(password, user.password_hash);
      if (!doestPasswordMatches) {
        throw new InvalidCredentialsError();
      }
      const newUser = yield this.usersRepository.update(user.id, __spreadProps(__spreadValues({}, user), {
        email: newEmail
      }));
      return {
        user: newUser
      };
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateEmailUseCase
});
