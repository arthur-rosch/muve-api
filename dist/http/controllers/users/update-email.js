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

// src/http/controllers/users/update-email.ts
var update_email_exports = {};
__export(update_email_exports, {
  updateEmail: () => updateEmail
});
module.exports = __toCommonJS(update_email_exports);
var import_zod2 = require("zod");

// src/use-cases/erros/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials.");
  }
};

// src/use-cases/cases/users/update-email.ts
var import_bcryptjs = require("bcryptjs");
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

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  JWT_SECRET: import_zod.z.string().nonempty(),
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DB_HOST: import_zod.z.string().nonempty(),
  DB_USER: import_zod.z.string().nonempty(),
  DB_PASS: import_zod.z.string().nonempty(),
  DB_NAME: import_zod.z.string().nonempty(),
  DATABASE_URL: import_zod.z.string().url().nonempty(),
  DB_PORT: import_zod.z.coerce.number().default(25060),
  DB_SSLMODE: import_zod.z.enum(["disable", "require", "verify-ca", "verify-full", "prefer"]).default("require"),
  STRIPE_KEY: import_zod.z.string().nonempty(),
  STRIPE_SECRET_KEY: import_zod.z.string().nonempty(),
  STRIPE_SECRET_WEBHOOK_KEY: import_zod.z.string().nonempty(),
  PASS_EMAIL: import_zod.z.string().nonempty(),
  USER_EMAIL: import_zod.z.string().nonempty(),
  HOST_EMAIL: import_zod.z.string().nonempty(),
  PORT_EMAIL: import_zod.z.coerce.number().default(465)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Invalid environment variables", _env.error.format());
  throw new Error("\u274C Invalid environment variables.");
}
var env = _env.data;

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-user-repository.ts
var PrimasUsersRepository = class {
  findById(id) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findFirst({
        where: {
          id
        }
      });
      return user;
    });
  }
  findByCustomerId(id) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findFirst({
        where: {
          stripeCustomersId: id
        }
      });
      return user;
    });
  }
  findByEmail(email) {
    return __async(this, null, function* () {
      const user = yield prisma.user.findUnique({
        where: {
          email
        }
      });
      return user;
    });
  }
  create(data) {
    return __async(this, null, function* () {
      const user = yield prisma.user.create({
        data: __spreadProps(__spreadValues({}, data), {
          role: "MEMBER"
        })
      });
      return user;
    });
  }
  update(id, data) {
    return __async(this, null, function* () {
      const user = yield prisma.user.update({
        where: {
          id
        },
        data: __spreadValues({}, data)
      });
      return user;
    });
  }
};

// src/use-cases/factories/user/make-update-email-use-case.ts
function makeUpdateEmailUseCase() {
  const usersRepository = new PrimasUsersRepository();
  const updateEmailUseCase = new UpdateEmailUseCase(usersRepository);
  return updateEmailUseCase;
}

// src/http/controllers/users/update-email.ts
function updateEmail(request, reply) {
  return __async(this, null, function* () {
    const updateEmailBodySchema = import_zod2.z.object({
      email: import_zod2.z.string().email(),
      newEmail: import_zod2.z.string().email(),
      password: import_zod2.z.string().min(6)
    });
    const { email, password, newEmail } = updateEmailBodySchema.parse(
      request.body
    );
    try {
      const updateEmailUseCase = makeUpdateEmailUseCase();
      const { user } = yield updateEmailUseCase.execute({
        email,
        newEmail,
        password
      });
      user.password_hash = "";
      return reply.status(200).send({
        user
      });
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message });
      }
      throw err;
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateEmail
});
